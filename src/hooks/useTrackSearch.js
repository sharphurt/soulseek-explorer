import {useEffect, useRef, useState} from 'react';
import {apiRequest} from '../utils/api';

const useTrackSearch = (initialQuery = '') => {
    const [query, setQuery] = useState(initialQuery);
    const [tracks, setTracks] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const runSearch = async (trimmed) => {
        setIsLoading(true);
        setError('');
        setHasSearched(true);

        try {
            const result = await apiRequest('/search/track', {
                method: 'POST',
                body: JSON.stringify({query: trimmed, page: 1, limit: 100, type: 'TRACK'}),
            });
            setTracks(Array.isArray(result.data?.entities) ? result.data.entities : []);
        } catch (err) {
            setTracks([]);
            setError(err.message || 'Track search failed');
        } finally {
            setIsLoading(false);
        }
    };

    const didAutoSearch = useRef(false);
    useEffect(() => {
        if (initialQuery && !didAutoSearch.current) {
            didAutoSearch.current = true;
            runSearch(initialQuery);
        }
    }, []);

    const search = async (event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        await runSearch(trimmed);
    };

    return {query, setQuery, tracks, hasSearched, isLoading, error, search};
};

export default useTrackSearch;