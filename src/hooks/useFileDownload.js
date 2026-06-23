import {useState} from 'react';
import {apiRequest} from '../utils/api';
import {getBaseFilename} from '../utils/formatters';
import {useDownloads} from '../context/DownloadContext';

export const useFileDownload = ({selectedTrack, intent, onNotify, onSuccess}) => {
    const [downloadingKey, setDownloadingKey] = useState('');
    const {refreshDownloads} = useDownloads();

    const download = async (fileNode) => {
        const body = {
            trackId: selectedTrack.iTunesId,
            filename: fileNode.filename,
            size: fileNode.size,
            username: fileNode.username,
            intent: intent,
        };
        const key = `${body.username}-${body.filename}`;
        setDownloadingKey(key);

        try {
            const result = await apiRequest('/soulseek/download', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            onNotify({type: 'success', title: 'Download queued', message: getBaseFilename(body.filename)});
            refreshDownloads({force: true, silent: false});
            await onSuccess(result.data);
        } catch (err) {
            onNotify({type: 'error', title: 'Download failed', message: err.message || 'Unable to start download'});
        } finally {
            setDownloadingKey('');
        }
    };

    return {downloadingKey, download};
}