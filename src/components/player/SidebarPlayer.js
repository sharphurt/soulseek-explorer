import {Plus} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {API_BASE_URL} from '../../utils/api.js';
import {useDownloads} from '../../context/DownloadContext.js';
import {useStreamPlayer} from '../../context/PlayerContext.js';
import PlayButton from "./PlayButton.js";
import TrackInfo from "./TrackInfo.js";
import EmptyPlayer from "./EmptyPlayer.js";
import {useAddToLibrary} from "../../hooks/useAddToLibrary.js";

const BYTES_THRESHOLD = 65_536;
const POLL_MS = 500;

const SidebarPlayer = ({onNotify}) => {
    const {downloads} = useDownloads();
    const {activeStream} = useStreamPlayer();
    const audioRef = useRef(null);
    const [status, setStatus] = useState('buffering');

    useEffect(() => {
        setStatus('buffering');
    }, [activeStream?.uuid]);

    useEffect(() => {
        if (!activeStream || status !== 'buffering') return;

        const intervalId = setInterval(() => {
            const download = downloads.find(d => d.uuid === activeStream.uuid);
            if ((download?.bytesTransferred ?? 0) > BYTES_THRESHOLD) {
                setStatus('playing');
            }
        }, POLL_MS);

        return () => clearInterval(intervalId);
    }, [activeStream, status, downloads]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (status === 'buffering') {
            audio.pause();
            audio.load();
        }

        if (status === 'playing') {
            audio.play().catch(err => {
                console.error('Playback failed:', err);
                setStatus('buffering');
            });
        }

        if (status === 'paused') {
            audio.pause();
        }
    }, [status]);

    const togglePlay = () =>
        setStatus(s => {
            if (s === 'buffering') return s;
            return s === 'playing' || s === 'stalled' ? 'paused' : 'playing';
        });

    const {downloadAndAddKey, downloadAndAdd} = useAddToLibrary({
        selectedTrack: activeStream?.selectedTrack ?? null,
        onNotify
    });

    if (!activeStream) return <EmptyPlayer/>;

    const streamUrl = `${API_BASE_URL}/soulseek/stream?downloadUuid=${activeStream.uuid}`;

    return (
        <div className="flex flex-col border-t border-white/10 bg-slate-900 p-4 shadow-lg">
            <audio
                ref={audioRef}
                src={status !== 'buffering' ? streamUrl : undefined}
                preload="none"
                onEnded={() => setStatus('paused')}
                onWaiting={() => setStatus(s => s !== 'paused' ? 'stalled' : s)}
                onPlaying={() => setStatus(s => s !== 'paused' ? 'playing' : s)}
                onError={() => setStatus(s => s !== 'paused' ? 'buffering' : s)}
            />

            <div className="flex items-center justify-between">
                <TrackInfo stream={activeStream} status={status}/>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        disabled={!!downloadAndAddKey}
                        onClick={() => downloadAndAdd(activeStream?.fileNode)}
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