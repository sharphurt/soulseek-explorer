import {useMemo, useState} from 'react';
import {getFileExtension} from '../utils/formatters';
import {getFileNode} from "../utils/getFileNode.js";
import {getSortValue} from "../utils/getSortValue.js";

export const EXTENSION_OPTIONS = ['ALL', 'FLAC', 'MP3', 'OPUS'];
export const SORT_OPTIONS = [
    {value: 'similarityScore', label: 'Similarity'},
    {value: 'size', label: 'Size'},
    {value: 'kbps', label: 'Bitrate'},
];

export const useFilteredResults = (results) => {
    const [filterExtension, setFilterExtension] = useState('ALL');
    const [sortBy, setSortBy] = useState('similarityScore');
    const [sortDirection, setSortDirection] = useState('desc');

    const toggleDirection = () =>
        setSortDirection(d => d === 'asc' ? 'desc' : 'asc');

    const visibleResults = useMemo(() => {
        const filtered = results.filter(result => {
            const ext = getFileExtension(getFileNode(result));
            return filterExtension === 'ALL' || ext === filterExtension;
        });

        return filtered.sort((a, b) => {
            const diff = getSortValue(a, sortBy) - getSortValue(b, sortBy);
            return sortDirection === 'asc' ? diff : -diff;
        });
    }, [results, filterExtension, sortBy, sortDirection]);

    return {
        visibleResults,
        filterExtension, setFilterExtension,
        sortBy, setSortBy,
        sortDirection, toggleDirection,
    };
}