import {useEffect, useState} from 'react';

const BYTES_THRESHOLD = 65_536;
const POLL_MS = 500;

const useStreamStatus = (activeStream, downloads) => {
    const [status, setStatus] = useState('buffering');

    useEffect(() => {
        setStatus('buffering');
    }, [activeStream?.id]);

    useEffect(() => {
        if (!activeStream || status !== 'buffering') return;

        const intervalId = setInterval(() => {
            const download = downloads.find(d => d.id === activeStream.id);
            if ((download?.bytesTransferred ?? 0) > BYTES_THRESHOLD) {
                setStatus('playing');
            }
        }, POLL_MS);

        return () => clearInterval(intervalId);
    }, [activeStream, status, downloads]);

    const togglePlay = () =>
        setStatus(s => {
            if (s === 'buffering') return s;
            return s === 'playing' || s === 'stalled' ? 'paused' : 'playing';
        });

    return {status, setStatus, togglePlay};
};

export default useStreamStatus;