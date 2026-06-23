import {Loader2, Music2} from 'lucide-react';
import {useLocation} from 'react-router-dom';
import {getTrackId} from '../utils/formatters';
import {useSoulseekSearch} from '../hooks/useSoulseekSearch.js';
import {useFilteredResults} from '../hooks/useFilteredResults.js';
import SearchControls from '../components/soulseek/SearchControls.js';
import SearchStatus from '../components/soulseek/SearchStatus.js';
import SearchResultItem from '../components/soulseek/SearchResultItem.js';
import {getFileNode} from "../utils/getFileNode.js";
import {usePlayStream} from "../hooks/usePlayStream.js";
import {useAddToLibrary} from "../hooks/useAddToLibrary.js";

const SoulseekResultsView = ({onBack, onNotify}) => {
    const {state} = useLocation();
    const selectedTrack = state?.selectedTrack;
    const trackId = getTrackId(selectedTrack);

    const {results, taskIds, isInitializing, isPolling, error, lastPolledAt} =
        useSoulseekSearch(trackId);

    const {
        visibleResults,
        filterExtension, setFilterExtension,
        sortBy, setSortBy,
        sortDirection, toggleDirection,
    } = useFilteredResults(results);


    const {downloadAndPlayKey, downloadAndPlay} = usePlayStream({selectedTrack, onNotify});
    const {downloadAndAddKey, downloadAndAdd} = useAddToLibrary({selectedTrack, onNotify});

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-xl p-4 sm:p-5">
                <SearchControls
                    track={selectedTrack}
                    onBack={onBack}
                    filterExtension={filterExtension}
                    onFilterChange={setFilterExtension}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    sortDirection={sortDirection}
                    onToggleDirection={toggleDirection}
                />
                <SearchStatus
                    taskIds={taskIds}
                    isInitializing={isInitializing}
                    isPolling={isPolling}
                    lastPolledAt={lastPolledAt}
                    visibleCount={visibleResults.length}
                    error={error}
                />
            </div>

            <div className="glass-panel min-h-[420px] overflow-hidden rounded-xl">
                {visibleResults.length === 0 ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                        {isPolling || isInitializing
                            ? <Loader2 className="h-10 w-10 animate-spin text-cyan-300"/>
                            : <Music2 className="h-10 w-10 text-slate-500"/>}
                        <p className="mt-3 text-sm font-medium text-slate-300">
                            {isPolling || isInitializing ? 'Collecting Soulseek results' : 'No files found'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-[980px] w-full table-fixed text-left">
                            <thead
                                className="border-b border-white/10 bg-slate-950/55 text-xs uppercase tracking-[0.14em] text-slate-500">
                            <tr>
                                <th className="w-36 px-4 py-3 text-right font-semibold"></th>
                                <th className="px-4 py-3 font-semibold">Filename</th>
                                <th className="w-32 px-4 py-3 font-semibold">Size</th>
                                <th className="w-32 px-4 py-3 font-semibold">Bitrate</th>
                                <th className="w-36 px-4 py-3 font-semibold">Extension</th>
                                <th className="w-32 px-4 py-3 font-semibold">Speed</th>
                            </tr>
                            </thead>
                            <tbody>
                            {visibleResults.map((result, index) => {
                                const fileNode = getFileNode(result);
                                const rowKey = `${fileNode.username ?? fileNode.userName ?? fileNode.user}-${fileNode.filename}`;
                                return (
                                    <SearchResultItem
                                        key={fileNode.id ?? fileNode.filename ?? index}
                                        result={result}
                                        onAdd={downloadAndAdd}
                                        onPlay={downloadAndPlay}
                                        isDownloading={downloadAndAddKey === rowKey || downloadAndPlayKey === rowKey}
                                    />
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SoulseekResultsView;