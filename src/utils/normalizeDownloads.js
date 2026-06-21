export function normalizeDownloads(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.downloads)) return payload.downloads;
    return [];
}