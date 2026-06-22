import SearchBar from "../components/search/SearchBar.js";
import SearchStatus from "../components/search/SearchStatus.js";
import TrackResults from "../components/search/TrackResults.js";
import {Sparkles} from "lucide-react";
import useTrackSearch from "../hooks/useTrackSearch.js";


export default function TrackSearchView({onSelectTrack}) {
    const {query, setQuery, tracks, hasSearched, isLoading, error, search} = useTrackSearch();

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-emerald-300">
                            <Sparkles className="h-5 w-5" aria-hidden="true"/>
                            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                Track Search
                            </span>
                        </div>
                        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                            Find a track
                        </h1>
                    </div>
                    <SearchBar
                        query={query}
                        onChange={setQuery}
                        onSubmit={search}
                        isLoading={isLoading}
                    />
                </div>

                {
                    hasSearched ? (
                        <div className="mt-4 flex min-h-6 items-center gap-3 text-sm text-slate-400">
                            <SearchStatus
                                error={error}
                                hasSearched={hasSearched}
                                count={tracks.length}
                            />
                        </div>
                    ) : null
                }
            </div>

            <TrackResults
                tracks={tracks}
                hasSearched={hasSearched}
                isLoading={isLoading}
                error={error}
                onSelectTrack={onSelectTrack}
            />
        </section>
    );
}