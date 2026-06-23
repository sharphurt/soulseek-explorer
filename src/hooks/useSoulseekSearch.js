import {useEffect, useRef, useState} from 'react';
import {apiRequest} from '../utils/api';

const POLL_INTERVAL_MS = 2000;

export const useSoulseekSearch = (trackId) => {
    const [results, setResults] = useState([]);
    const [taskIds, setTaskIds] = useState([]);
    const [trackData, setTrackData] = useState({});
    const [isAlreadyDownloaded, setIsAlreadyDownloaded] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState('');
    const [lastPolledAt, setLastPolledAt] = useState(null);
    const postSentForTrackId = useRef(null);
    const alreadyDownloadedRef = useRef(false); // shared между mount-ами

    useEffect(() => {
        if (!trackId) {
            setError('Selected track is missing an iTunesId');
            return;
        }

        alreadyDownloadedRef.current = false; // сброс при смене trackId

        let active = true;
        const controller = new AbortController();
        const {signal} = controller;

        const poll = async () => {
            if (!active || alreadyDownloadedRef.current) return;

            setIsPolling(true);
            try {
                const result = await apiRequest(
                    `/soulseek/search/results?trackId=${encodeURIComponent(trackId)}`,
                    {signal},
                );
                if (active) {
                    setResults(Array.isArray(result.data) ? result.data : []);
                    setError('');
                    setLastPolledAt(new Date());
                }
            } catch (err) {
                if (active && err.name !== 'AbortError')
                    setError(err.message || 'Unable to load results');
            } finally {
                setIsPolling(false);
            }
        };

        const initialize = async () => {
            if (postSentForTrackId.current === trackId) return;
            postSentForTrackId.current = trackId;

            setIsInitializing(true);
            setError('');
            try {
                const result = await apiRequest(
                    `/soulseek/search?trackId=${encodeURIComponent(trackId)}`,
                    {method: 'POST'}
                );

                const downloaded =
                    result.data.trackData.trackStatus === 'IN_LIBRARY' ||
                    result.data.trackData.trackStatus === 'IN_TEMP_STORAGE';

                alreadyDownloadedRef.current = downloaded;

                setTrackData(result.data.trackData || null);
                setTaskIds(Array.isArray(result.data.createdTasks) ? result.data.createdTasks : []);
                setIsAlreadyDownloaded(downloaded);
                console.log(downloaded);
            } catch (err) {
                if (active && err.name !== 'AbortError')
                    setError(err.message || 'Unable to initialize soulseek');
            } finally {
                setIsInitializing(false);
            }
        };

        initialize().finally(poll);
        const intervalId = setInterval(poll, POLL_INTERVAL_MS);

        return () => {
            active = false;
            controller.abort();
            clearInterval(intervalId);
        };
    }, [trackId]);

    return {results, trackData, taskIds, isInitializing, isAlreadyDownloaded, isPolling, error, lastPolledAt};
}