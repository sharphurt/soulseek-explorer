import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,} from 'react';
import {apiRequest} from '../utils/api';
import {normalizeDownloads} from '../utils/normalizeDownloads';

const POLL_INTERVAL_MS = 2000;
const DownloadContext = createContext(null);

export function DownloadProvider({children}) {
    const [downloads, setDownloads] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const abortRef = useRef(null);
    const inFlightRef = useRef(false);

    const refreshDownloads = useCallback(async ({force = true, silent = true} = {}) => {
        if (inFlightRef.current && !force) return;

        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;
        inFlightRef.current = true;

        if (!silent) setIsLoading(true);

        try {
            const payload = await apiRequest('/soulseek/download/list', {
                signal: controller.signal,
            });

            if (!controller.signal.aborted) {
                setDownloads(normalizeDownloads(payload));
                setError('');
                setLastUpdated(new Date());
            }
        } catch (err) {
            if (!controller.signal.aborted && err.name !== 'AbortError') {
                setError(err.message || 'Unable to load downloads');
            }
        } finally {
            if (!controller.signal.aborted) setIsLoading(false);
            inFlightRef.current = false;
        }
    }, []);

    useEffect(() => {
        refreshDownloads({force: true, silent: false});

        const intervalId = setInterval(() => {
            refreshDownloads({force: false, silent: true});
        }, POLL_INTERVAL_MS);

        return () => {
            abortRef.current?.abort();
            clearInterval(intervalId);
        };
    }, [refreshDownloads]);

    const value = useMemo(
        () => ({downloads, error, isLoading, lastUpdated, refreshDownloads}),
        [downloads, error, isLoading, lastUpdated, refreshDownloads],
    );

    return (
        <DownloadContext.Provider value={value}>
            {children}
        </DownloadContext.Provider>
    );
}

export function useDownloads() {
    const context = useContext(DownloadContext);
    if (!context) throw new Error('useDownloads must be used within DownloadProvider');
    return context;
}