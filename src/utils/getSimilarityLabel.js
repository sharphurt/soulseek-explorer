export const getSimilarityLabel = (score) => {
    const value = Number(score);

    if (!Number.isFinite(value)) {
        return '0%';
    }

    return value <= 1 ? `${Math.round(value * 100)}%` : `${Math.round(value)}%`;
}
