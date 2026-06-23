import {useEffect, useState} from 'react';
import {apiRequest} from '../utils/api';

const POLL_INTERVAL_MS = 2000;

export const useSoulseekSearch = (trackId) => {
    const [results, setResults] = useState([]);
    const [taskIds, setTaskIds] = useState([]);
    const [isInitializing, setIsInitializing] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState('');
    const [lastPolledAt, setLastPolledAt] = useState(null);

    useEffect(() => {
        if (!trackId) {
            setError('Selected track is missing an iTunesId');
            return;
        }

        let active = true;
        const controller = new AbortController();
        const {signal} = controller;

        const initialize = async () => {
            setIsInitializing(true);
            setError('');
            try {
                const result = await apiRequest(
                    `/soulseek/search?trackId=${encodeURIComponent(trackId)}`,
                    {method: 'POST', signal},
                );
                if (active) setTaskIds(Array.isArray(result.data) ? result.data : []);
            } catch (err) {
                if (active && err.name !== 'AbortError')
                    setError(err.message || 'Unable to initialize soulseek');
            } finally {
                if (active) setIsInitializing(false);
            }
        };

        const poll = async () => {
            if (!active) return;
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
                if (active) setIsPolling(false);
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

    return {results, taskIds, isInitializing, isPolling, error, lastPolledAt};
}