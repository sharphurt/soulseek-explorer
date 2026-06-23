import {Download} from 'lucide-react';
import {formatTransferSpeed} from '../../utils/formatters.js';
import {getProgress} from "../../utils/getProgress.js";
import {getStatusMeta} from "../../utils/getStatusMeta.js";
import ProgressBar from "./ProgressBar.js";

const DownloadItem = ({download}) => {
    const progress = getProgress(download);
    const speed = download.averageSpeed ?? download.speed ?? download.downloadSpeed ?? 0;
    const status = getStatusMeta(download);
    const StatusIcon = status.icon;

    return (
        <article className="rounded-lg border border-white/10 bg-slate-950/45 p-3 shadow-lg shadow-black/10">
            <div className="flex items-center gap-3">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                    <Download className="h-5 w-5" aria-hidden="true"/>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-100" title={download.trackName}>
                        {download.trackName}
                    </p>
                    <p className="truncate text-xs text-slate-400" title={download.trackName}>
                        {download.artistName}
                    </p>
                    {download.state === 'InProgress' &&
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span>{formatTransferSpeed(speed)}</span>
                        </div>
                    }
                </div>
                <span
                    className={`inline-flex max-w-full items-center gap-1 rounded-md border px-2 py-1 font-medium ${status.className}`}>
                    <StatusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
                    <span className="truncate text-sm">{status.label}</span>
                </span>
            </div>
            {download.state === 'InProgress' && <ProgressBar value={progress}/>}
        </article>
    );
};

export default DownloadItem;