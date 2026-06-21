export const getProgress = (download) => {
    const value = Number(
        download.percentComplete ??
        download.progressPercent ??
        download.progress ??
        download.percent ??
        0
    );
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}
