import {useLocation} from 'react-router-dom';
import {getTrackId} from '../utils/formatters';
import {useSoulseekSearch} from '../hooks/useSoulseekSearch.js';
import {useFilteredResults} from '../hooks/useFilteredResults.js';
import SearchControls from '../components/soulseek/SearchControls.js';
import SearchStatus from '../components/soulseek/SearchStatus.js';
import SearchResultList from "../components/soulseek/SearchResultList.js";
import AlreadyDownloadedTrackInfo from "../components/soulseek/AlreadyDownloadedTrackInfo.js";

const SoulseekResultsView = ({onBack, onNotify}) => {
    const {state} = useLocation();
    const selectedTrack = state?.selectedTrack;
    const trackId = getTrackId(selectedTrack);

    const {
        results,
        taskIds,
        trackData,
        isInitializing,
        isAlreadyDownloaded,
        isPolling,
        error,
        lastPolledAt
    } = useSoulseekSearch(trackId);

    const {
        visibleResults,
        filterExtension, setFilterExtension,
        sortBy, setSortBy,
        sortDirection, toggleDirection,
    } = useFilteredResults(results);


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
                {
                    isAlreadyDownloaded
                        ? <AlreadyDownloadedTrackInfo/>
                        : <SearchResultList visibleResults={visibleResults}
                                            isPolling={isPolling}
                                            trackData={trackData}
                                            isInitializing={isInitializing}
                                            onNotify={onNotify}/>
                }
            </div>
        </section>
    );
}

export default SoulseekResultsView;