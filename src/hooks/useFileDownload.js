import {useState} from 'react';
import {apiRequest} from '../utils/api';
import {getBaseFilename} from '../utils/formatters';
import {useDownloads} from '../context/DownloadContext';
import {useStreamPlayer} from '../context/PlayerContext';

export const useFileDownload = ({selectedTrack, onNotify}) => {
    const [downloadingKey, setDownloadingKey] = useState('');
    const {refreshDownloads} = useDownloads();
    const {setActiveStream} = useStreamPlayer();

    const download = async (fileNode) => {
        const body = {
            filename: fileNode.filename,
            size: fileNode.size,
            username: fileNode.username,
        };
        const key = `${body.username}-${body.filename}`;
        setDownloadingKey(key);

        try {
            const data = await apiRequest('/soulseek/download', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            onNotify({type: 'success', title: 'Download queued', message: getBaseFilename(body.filename)});
            refreshDownloads({force: true, silent: false});

            const [task] = data.enqueued ?? [];
            if (task) {
                setActiveStream({
                    id: task.id,
                    filename: task.filename,
                    displayName: selectedTrack.title || 'Unknown Track',
                    artist: selectedTrack.artist || 'Unknown Artist',
                });
            }
        } catch (err) {
            onNotify({type: 'error', title: 'Download failed', message: err.message || 'Unable to start download'});
        } finally {
            setDownloadingKey('');
        }
    };

    return {downloadingKey, download};
}