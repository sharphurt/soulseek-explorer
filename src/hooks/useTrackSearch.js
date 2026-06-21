import {useState} from 'react';
import {apiRequest} from '../utils/api';

const useTrackSearch = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const search = async (event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;

        setIsLoading(true);
        setError('');
        setHasSearched(true);

        try {
            const payload = await apiRequest('/search/track', {
                method: 'POST',
                body: JSON.stringify({query: trimmed, page: 1, limit: 100, type: 'TRACK'}),
            });
            setTracks(Array.isArray(payload?.entities) ? payload.entities : []);
        } catch (err) {
            setTracks([]);
            setError(err.message || 'Track search failed');
        } finally {
            setIsLoading(false);
        }
    };

    return {query, setQuery, tracks, hasSearched, isLoading, error, search};
}

export default useTrackSearch;