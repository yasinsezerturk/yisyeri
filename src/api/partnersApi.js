import axios from "axios";
import { normalizePartner } from "../utils/partnerData";

const api = axios.create({
  baseURL: "https://keos.bcekmece.bel.tr/BELNET/",
  timeout: 15000,
});

let session = null;
let loginRequest = null;
let partnersRequest = null;
let cachedPartners = null;
let cacheExpiry = 0;

async function login() {
  if (session && session.expiresAt > Date.now()) return session.id;
  if (!loginRequest) {
    loginRequest = (async () => {
      const username = process.env.REACT_APP_API_USERNAME;
      const password = process.env.REACT_APP_API_PASSWORD;
      if (!username || !password) {
        throw new Error("İşyeri servisi giriş bilgileri yapılandırılmamış.");
      }
      const { data } = await api.get("LogonService.asmx/Login", {
        params: { username, password },
        responseType: "text",
      });
      const xml = new DOMParser().parseFromString(data, "application/xml");
      const id = xml.getElementsByTagNameNS("*", "string")[0]?.textContent?.trim();
      if (xml.querySelector("parsererror") || !id) {
        throw new Error("İşyeri servisine giriş yapılamadı.");
      }
      session = { id, expiresAt: Date.now() + 15 * 60 * 1000 };
      return id;
    })().finally(() => { loginRequest = null; });
  }
  return loginRequest;
}

async function queryPartners() {
  // Süresi dolan oturum için yalnızca bir kez yeniden giriş yap.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const id = await login();
    try {
      const { data } = await api.get("gisapi/query/query", {
        params: { queryname: "vw_yesil_isyeri.Sorgusu", sessionid: id },
      });
      const rows = data?.rows ?? data?.Rows;
      if (!Array.isArray(rows)) {
        throw new Error("İşyeri servisinden beklenen veri alınamadı.");
      }
      return rows.map(normalizePartner);
    } catch (error) {
      if (error.response?.status !== 401 || attempt === 1) throw error;
      if (session?.id === id) session = null;
    }
  }
}

function serviceError(error) {
  if (!axios.isAxiosError(error)) return error;
  if (error.code === "ECONNABORTED") {
    return new Error("İşyeri servisi zamanında yanıt vermedi. Lütfen tekrar deneyin.");
  }
  if (!error.response) {
    return new Error("İşyeri servisine erişilemiyor. Bağlantıyı ve servis erişim izinlerini kontrol edin.");
  }
  return new Error("İşyeri verileri alınamadı. Lütfen daha sonra tekrar deneyin.");
}

async function getAllPartners() {
  if (cachedPartners && cacheExpiry > Date.now()) return cachedPartners;
  if (!partnersRequest) {
    partnersRequest = queryPartners()
      .then((partners) => {
        cachedPartners = partners;
        cacheExpiry = Date.now() + 60 * 1000;
        return partners;
      })
      .catch((error) => { throw serviceError(error); })
      .finally(() => { partnersRequest = null; });
  }
  return partnersRequest;
}

export async function getPartners(page = 1, limit = 5) {
  const partners = await getAllPartners();
  const start = (page - 1) * limit;
  return partners.slice(start, start + limit);
}

export async function getPartner(id) {
  const partners = await getAllPartners();
  return partners.find((partner) => String(partner.objectid) === String(id)) || null;
}
