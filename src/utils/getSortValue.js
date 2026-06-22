import {getBitrate} from "./formatters.js";
import {getFileNode} from "./getFileNode.js";

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