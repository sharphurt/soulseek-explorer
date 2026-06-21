import {Loader2, Search} from "lucide-react";

const SearchBar = ({query, onChange, onSubmit, isLoading}) => {
    return (
        <form
            className="flex w-full flex-col gap-3 sm:flex-row xl:max-w-2xl"
            onSubmit={onSubmit}
        >
            <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search query</span>
                <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                />
                <input
                    value={query}
                    onChange={e => onChange(e.target.value)}
                    className="focus-ring h-11 w-full rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-4 text-sm text-white placeholder:text-slate-500"
                    placeholder="Artist, track, or album"
                    autoComplete="off"
                />
            </label>
            <button
                type="submit"
                className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:bg-slate-700 disabled:text-slate-400"
                disabled={isLoading || !query.trim()}
            >
                {isLoading
                    ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true"/>
                    : <Search className="h-4 w-4" aria-hidden="true"/>}
                Search
            </button>
        </form>
    );
}

export default SearchBar;