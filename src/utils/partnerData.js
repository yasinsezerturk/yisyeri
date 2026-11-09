export function parsePartnerImages(files) {
  try {
    const parsed = typeof files === "string" ? JSON.parse(files) : files;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((image) => {
      if (!image || typeof image.src !== "string" || !image.src.trim()) return false;
      try {
        const url = new URL(image.src, window.location.origin);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

export function normalizePartner(row) {
  const cells = row.Cells ?? row.cells;
  const partner = { ...row, Cells: Array.isArray(cells) ? cells : [] };
  partner.Cells.forEach((cell) => {
    const name = cell.ColumnName?.replace(/^vw_yesil_isyeri\./, "");
    if (name) partner[name] = cell.Value ?? cell.DisplayText ?? "";
  });
  partner.files = parsePartnerImages(partner.files);
  return partner;
}

export function getMapEmbedUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const document = new DOMParser().parseFromString(value, "text/html");
  const src = document.querySelector("iframe")?.getAttribute("src") || value.trim();
  try {
    const url = new URL(src);
    const hosts = ["google.com", "www.google.com", "maps.google.com", "google.com.tr", "www.google.com.tr", "maps.google.com.tr"];
    const mapPath = url.pathname === "/maps" || url.pathname.startsWith("/maps/") || (url.hostname.startsWith("maps.") && url.pathname === "/");
    return url.protocol === "https:" && hosts.includes(url.hostname) && mapPath ? url.href : null;
  } catch {
    return null;
  }
}
