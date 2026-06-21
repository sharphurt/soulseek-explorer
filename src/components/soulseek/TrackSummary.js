import {Music2} from "lucide-react";

const TrackSummary = ({track}) => {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                {Array.isArray(track?.imageUrls) && track.imageUrls[0] ? (
                    <img
                        src={track.imageUrls[0]}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <Music2 className="h-6 w-6 text-slate-500" aria-hidden="true"/>
                )}
            </div>
            <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                    {track?.title || 'Selected track'}
                </p>
                <p className="truncate text-sm text-slate-400">
                    {track?.artistName || 'Unknown artist'}
                </p>
            </div>
        </div>
    );
}

export default TrackSummary;