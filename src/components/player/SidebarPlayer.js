import {Plus} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {API_BASE_URL} from '../../utils/api.js';
import {useDownloads} from '../../context/DownloadContext.js';
import {useStreamPlayer} from '../../context/PlayerContext.js';
import PlayButton from "./PlayButton.js";
import TrackInfo from "./TrackInfo.js";
import EmptyPlayer from "./EmptyPlayer.js";
import useStreamStatus from "../../hooks/useStreamingStatus.js";

const SidebarPlayer = () => {
    const {downloads} = useDownloads();
    const {activeStream} = useStreamPlayer();
    const audioRef = useRef(null);

    const {status, setStatus, togglePlay} = useStreamStatus(activeStream, downloads);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (status === 'playing') audio.play().catch(err => console.error('Playback failed:', err));
        if (status === 'paused') audio.pause();
    }, [status]);

    if (!activeStream) return <EmptyPlayer/>;

    const streamUrl = `${API_BASE_URL}/soulseek/stream?downloadUuid=${activeStream.uuid}`;

    return (
        <div className="flex flex-col border-t border-white/10 bg-slate-900 p-4 shadow-lg">
            <audio
                ref={audioRef}
                src={status !== 'buffering' ? streamUrl : undefined}
                preload="metadata"
                onEnded={() => setStatus('paused')}
                onWaiting={() => setStatus(s => s !== 'paused' ? 'stalled' : s)}
                onPlaying={() => setStatus(s => s !== 'paused' ? 'playing' : s)}
            />

            <div className="flex items-center justify-between">
                <TrackInfo stream={activeStream} status={status}/>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={() => {
                        }}
                        className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
                        title="Add to library (Coming soon)"
                    >
                        <Plus className="h-5 w-5"/>
                    </button>
                    <PlayButton status={status} onToggle={togglePlay}/>
                </div>
            </div>
        </div>
    );
}

export default SidebarPlayer;