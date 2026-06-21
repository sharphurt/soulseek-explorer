import {ArrowLeft, ArrowUpDown, Filter, SlidersHorizontal} from 'lucide-react';
import {EXTENSION_OPTIONS, SORT_OPTIONS} from '../../hooks/useFilteredResults.js';
import TrackSummary from './TrackSummary.js';

const SearchControls = ({
                                   track,
                                   onBack,
                                   filterExtension,
                                   onFilterChange,
                                   sortBy,
                                   onSortChange,
                                   sortDirection,
                                   onToggleDirection,
                               }) => {
    return (
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
                <button type="button" className="icon-button" onClick={onBack} aria-label="Back">
                    <ArrowLeft className="h-4 w-4"/>
                </button>
                <TrackSummary track={track}/>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_minmax(0,12rem)_auto] sm:items-center">
                <label className="relative">
                    <Filter
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"/>
                    <select
                        value={filterExtension}
                        onChange={e => onFilterChange(e.target.value)}
                        className="focus-ring h-10 w-full appearance-none rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-8 text-sm text-slate-100"
                    >
                        {EXTENSION_OPTIONS.map(ext => (
                            <option key={ext} value={ext}>{ext === 'ALL' ? 'All formats' : ext}</option>
                        ))}
                    </select>
                </label>

                <label className="relative">
                    <SlidersHorizontal
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"/>
                    <select
                        value={sortBy}
                        onChange={e => onSortChange(e.target.value)}
                        className="focus-ring h-10 w-full appearance-none rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-8 text-sm text-slate-100"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>

                <button
                    type="button"
                    className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                    onClick={onToggleDirection}
                >
                    <ArrowUpDown className="h-4 w-4"/>
                    {sortDirection === 'asc' ? 'Asc' : 'Desc'}
                </button>
            </div>
        </div>
    );
};

export default SearchControls;