export const getFileNode = (result) => {
    return result?.fileNodeDto || result?.fileNode || result || {};
}

export const getSortValue = (result, sortBy) => {
    const fileNode = getFileNode(result);

    if (sortBy === 'size') {
        return Number(fileNode.size) || 0;
    }

    if (sortBy === 'kbps') {
        return getBitrate(fileNode) || 0;
    }

    return Number(result.similarityScore) || 0;
}


export const getSimilarityLabel = (score) => {
    const value = Number(score);

    if (!Number.isFinite(value)) {
        return '0%';
    }

    return value <= 1 ? `${Math.round(value * 100)}%` : `${Math.round(value)}%`;
}
