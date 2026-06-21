import {Loader2, RefreshCw, SearchCheck, ServerCrash} from 'lucide-react';

const SearchStatus = ({taskIds, isInitializing, isPolling, lastPolledAt, visibleCount, error}) => {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
                {isInitializing
                    ? <Loader2 className="h-4 w-4 animate-spin text-emerald-300"/>
                    : <SearchCheck className="h-4 w-4 text-emerald-300"/>}
                {taskIds.length > 0
                    ? `${taskIds.length} search tasks initialized`
                    : isInitializing ? 'Initializing soulseek tasks' : 'Search initialized'}
            </span>

            <span className="inline-flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 text-cyan-300 ${isPolling ? 'animate-spin' : ''}`}/>
                {lastPolledAt ? lastPolledAt.toLocaleTimeString() : 'Polling'}
            </span>

            <span>{visibleCount} visible results</span>

            {error && (
                <span className="inline-flex items-center gap-2 text-rose-200">
                    <ServerCrash className="h-4 w-4"/>
                    {error}
                </span>
            )}
        </div>
    );
};

export default SearchStatus;