import {useState} from 'react';
import {Music2} from 'lucide-react';

function getArtwork(track) {
    if (!Array.isArray(track.imageUrls)) return '';
    return track.imageUrls.find(Boolean) ?? '';
}

const TrackArtwork = ({track}) => {
    const [didFail, setDidFail] = useState(false);
    const artwork = getArtwork(track);

    if (!artwork || didFail) {
        return (
            <div className="flex aspect-square h-full w-full items-center justify-center bg-slate-800 text-slate-500">
                <Music2 className="h-10 w-10" aria-hidden="true"/>
            </div>
        );
    }

    return (
        <img
            src={artwork}
            alt=""
            className="aspect-square h-full w-full object-cover"
            loading="lazy"
            onError={() => setDidFail(true)}
        />
    );
}

export default TrackArtwork;