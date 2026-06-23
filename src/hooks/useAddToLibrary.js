import {useFileDownload} from "./useFileDownload.js";
import {apiRequest} from "../utils/api.js";

export const useAddToLibrary = ({selectedTrack, onNotify}) => {
    const onSuccess = async (data) => {
        if (!data?.uuid) return;

        let status;
        try {
            const result = await apiRequest(`/library/add`, {
                method: 'POST',
                body: JSON.stringify({
                    downloadUuid: data.uuid,
                }),
            });
            status = result.status;
        } catch (err) {
            status = err.status;
            if (!status) {
                onNotify({type: 'error', title: 'Не удалось добавить трек в библиотеку', message: err.message});
                return;
            }
        }

        switch (status) {
            case 200:
                onNotify({type: 'success', title: 'Файл будет перемещен в библиотеку'});
                break;
            case 202:
                onNotify({type: 'success', title: 'Файл будет загружен заново'});
                break;
            case 304:
                onNotify({type: 'success', title: 'Файл уже добавлен в библиотеку'});
                break;
            case 404:
                onNotify({type: 'error', title: 'Запрошенный файл не найден'});
                break;
        }
    };

    const {downloadingKey, download} = useFileDownload({selectedTrack, intent: 'ADD', onNotify, onSuccess});
    return {downloadAndAddKey: downloadingKey, downloadAndAdd: download};
};