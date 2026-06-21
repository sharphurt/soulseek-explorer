const TrackInfo = ({stream, status}) => {
    const name = stream.displayName || getBaseFilename(stream.filename);
    const subtitle = status === 'buffering' || status === 'stalled'
        ? 'Buffering…'
        : 'Playing from stream';

    return (
        <div className="flex-1 overflow-hidden pr-4">
            <p className="truncate text-sm font-semibold text-slate-100">{name}</p>
            <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
    );
}

export default TrackInfo;