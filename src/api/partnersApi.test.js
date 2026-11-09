jest.mock("axios", () => ({
  create: jest.fn(() => ({ get: jest.fn() })),
  isAxiosError: (error) => Boolean(error.isAxiosError),
}));

let api;
let get;
const loginXml = '<string xmlns="http://tempuri.org/">test-session</string>';
const row = (id) => ({Cells:[{ColumnName:"vw_yesil_isyeri.objectid",Value:id},{ColumnName:"vw_yesil_isyeri.isyeri_unvani",Value:`İşyeri ${id}`} ]});

beforeEach(() => {
  jest.resetModules();
  process.env.REACT_APP_API_USERNAME = "test-user";
  process.env.REACT_APP_API_PASSWORD = "test-password";
  api = require("./partnersApi");
  get = require("axios").create.mock.results[0].value.get;
});

it("eşzamanlı liste ve detay çağrılarında bir giriş ve bir sorgu yapar", async () => {
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{Rows:[row(1),row(2)]}});
  const [partners, detail] = await Promise.all([api.getPartners(1,1),api.getPartner(2)]);
  expect(partners).toHaveLength(1);
  expect(detail.objectid).toBe(2);
  expect(get).toHaveBeenCalledTimes(2);
  expect(await api.getPartners(3,1)).toEqual([]);
  expect(await api.getPartner(99)).toBeNull();
  expect(get).toHaveBeenCalledTimes(2);
});

it("sürekli 401 yanıtında yalnızca bir kez oturumu yeniler", async () => {
  const unauthorized = {isAxiosError:true,response:{status:401}};
  get.mockResolvedValueOnce({data:loginXml}).mockRejectedValueOnce(unauthorized)
    .mockResolvedValueOnce({data:loginXml}).mockRejectedValueOnce(unauthorized);
  await expect(api.getPartners()).rejects.toThrow("İşyeri verileri alınamadı");
  expect(get).toHaveBeenCalledTimes(4);
});

it("boş giriş yanıtından sonra sorgu göndermez", async () => {
  get.mockResolvedValueOnce({data:'<string xmlns="http://tempuri.org/"></string>'});
  await expect(api.getPartners()).rejects.toThrow("giriş yapılamadı");
  expect(get).toHaveBeenCalledTimes(1);
});

it("ağ hatasını boş listeye çevirmeden bildirir ve sonraki çağrıda toparlanır", async () => {
  get.mockRejectedValueOnce({isAxiosError:true,code:"ERR_NETWORK"});
  await expect(api.getPartners()).rejects.toThrow("erişilemiyor");
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{rows:[row(1)]}});
  await expect(api.getPartners()).resolves.toHaveLength(1);
});

it("geçersiz sorgu yanıtını boş veri gibi göstermez", async () => {
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{error:"bad response"}});
  await expect(api.getPartners()).rejects.toThrow("beklenen veri alınamadı");
});
