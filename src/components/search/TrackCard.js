import {Clock3} from 'lucide-react';
import TrackArtwork from "./TrackArtwork.js";
import {formatDuration, getTrackId} from "../../utils/formatters.js";

const TrackCard = ({track, onSelectTrack}) => {
    const trackId = getTrackId(track);
    const genres = Array.isArray(track.genres) ? track.genres.filter(Boolean) : [];

    return (
        <article onClick={() => onSelectTrack(track)} disabled={!trackId}
                 className="group flex min-h-[230px] flex-col overflow-hidden rounded-lg border border-white/10 bg-slate-900/65 hover:bg-white/[0.04] shadow-xl shadow-black/20 transition duration-200 cursor-pointer">
            <div className="relative aspect-square overflow-hidden">
                <TrackArtwork track={track}/>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/88 to-transparent p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                        <Clock3 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true"/>
                        {formatDuration(track.duration)}
                    </div>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col p-4">
                <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white">
                        {track.title || 'Untitled track'}
                    </h3>
                    <p className="mt-1 truncate text-sm text-slate-300">
                        {track.artistName || 'Unknown artist'}
                    </p>
                    {track.albumName && (
                        <p className="mt-1 truncate text-xs text-slate-500">{track.albumName}</p>
                    )}
                </div>

                {genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {genres.map(genre => (
                            <span
                                key={genre}
                                className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[11px] font-medium text-emerald-100"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="focus-ring mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:bg-slate-700 disabled:text-slate-400"*/}
                {/*    onClick={() => onSelectTrack(track)}*/}
                {/*    disabled={!trackId}*/}
                {/*    title={trackId ? 'Search files on Soulseek' : 'Missing iTunesId'}*/}
                {/*>*/}
                {/*    <Search className="h-4 w-4" aria-hidden="true"/>*/}
                {/*    Search Files on Soulseek*/}
                {/*</button>*/}
            </div>
        </article>
    );
}

export default TrackCard;