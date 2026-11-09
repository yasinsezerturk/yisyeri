import { getMapEmbedUrl, normalizePartner, parsePartnerImages } from "./partnerData";

it("bozuk ve dizi olmayan görsel verilerini güvenle atlar", () => {
  expect(parsePartnerImages("{" )).toEqual([]);
  expect(parsePartnerImages('{"src":"https://example.com/a.png"}')).toEqual([]);
  expect(parsePartnerImages('[null,{"src":"javascript:alert(1)"},{"src":"https://example.com/a.png"}]')).toEqual([{src:"https://example.com/a.png"}]);
});

it("hücre sırasından bağımsız olarak işyerini normalize eder", () => {
  const partner = normalizePartner({cells: [
    {ColumnName:"vw_yesil_isyeri.files",Value:'[{"src":"https://example.com/a.png"}]'},
    {ColumnName:"vw_yesil_isyeri.isyeri_unvani",Value:"Örnek İşyeri"},
    {ColumnName:"vw_yesil_isyeri.objectid",Value:0},
  ]});
  expect(partner.objectid).toBe(0);
  expect(partner.isyeri_unvani).toBe("Örnek İşyeri");
  expect(partner.files).toHaveLength(1);
});

it("harita HTML'sinden yalnızca izinli HTTPS iframe adresini alır", () => {
  expect(getMapEmbedUrl('<iframe src="https://www.google.com/maps/embed?pb=1" onload="alert(1)"></iframe><img src=x onerror=alert(1)>')).toBe("https://www.google.com/maps/embed?pb=1");
  for (const src of ["javascript:alert(1)", "https://www.google.com.evil.test/maps/embed", "https://example.com/maps/embed", "http://www.google.com/maps/embed", "https://www.google.com/search?q=x"]) {
    expect(getMapEmbedUrl(`<iframe src="${src}"></iframe>`)).toBeNull();
  }
});
