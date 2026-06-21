const ProgressBar = ({value}) => {
    return (
        <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span className="font-medium text-slate-200">{value.toFixed(0)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                    className="h-full rounded-full bg-cyan-300 transition-all duration-500"
                    style={{width: `${value}%`}}
                />
            </div>
        </div>
    );
};

export default ProgressBar;