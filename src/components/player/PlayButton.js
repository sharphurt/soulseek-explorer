import {Loader2, Pause, Play} from "lucide-react";

const PlayButton = ({status, onToggle}) => {
    const isWaiting = status === 'buffering' || status === 'stalled';
    const isPlaying = status === 'playing';
    const disabled = status === 'buffering';

    return (
        <button
            onClick={onToggle}
            disabled={disabled}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-slate-950 transition-transform hover:scale-105 active:scale-95 ${
                disabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
        >
            {isWaiting ? (
                <Loader2 className="h-5 w-5 animate-spin"/>
            ) : isPlaying ? (
                <Pause className="h-5 w-5 fill-current"/>
            ) : (
                <Play className="h-5 w-5 fill-current ml-1"/>
            )}
        </button>
    );
}

export default PlayButton;