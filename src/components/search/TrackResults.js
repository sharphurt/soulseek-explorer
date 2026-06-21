import {Disc3} from "lucide-react";
import TrackCard from "./TrackCard.js";
import {getTrackId} from "../../utils/formatters.js";

const TrackResults = ({tracks, hasSearched, isLoading, error, onSelectTrack}) => {
    if (tracks.length > 0) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {tracks.map((track, index) => (
                    <TrackCard
                        key={getTrackId(track) ?? `${track.title}-${track.artistName}-${index}`}
                        track={track}
                        onSelectTrack={onSelectTrack}
                    />
                ))}
            </div>
        );
    }

    if (hasSearched && !isLoading && !error) {
        return (
            <div
                className="glass-panel flex min-h-[260px] flex-col items-center justify-center rounded-xl px-6 text-center">
                <Disc3 className="h-10 w-10 text-slate-500" aria-hidden="true"/>
                <p className="mt-3 text-sm font-medium text-slate-300">No tracks found</p>
            </div>
        );
    }

    return null;
}

export default TrackResults;