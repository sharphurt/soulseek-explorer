export const getFileNode = (result) => {
    return result?.fileNodeDto || result?.fileNode || result || {};
}
