import {
    formatBitrate,
    formatBytes,
    formatTransferSpeed,
    getBaseFilename,
    getFileExtension
} from "../../utils/formatters.js";
import {Loader2, Play} from "lucide-react";
import {getFileNode, getSimilarityLabel} from "../../utils/utils.js";


const ResultRow = ({result, onPlay, isDownloading}) => {
    const fileNode = getFileNode(result);
    const filename = fileNode.filename || '';
    const baseFilename = getBaseFilename(filename);
    const extension = getFileExtension(fileNode);
    const username = fileNode.username || fileNode.userName || fileNode.user || 'Unknown';
    const uploadSpeed = fileNode.uploadSpeed ?? fileNode.speed ?? 0;

    return (
        <tr className="border-b border-white/5 transition hover:bg-white/[0.04]">
            <td className="whitespace-nowrap px-4 py-3">
        <span
            className="rounded-md border border-indigo-300/25 bg-indigo-300/10 px-2 py-1 text-xs font-semibold text-indigo-100">
          {extension}
        </span>
            </td>
            <td className="min-w-[280px] px-4 py-3">
                <p className="max-w-[44rem] truncate text-sm font-medium text-slate-100" title={filename}>
                    {baseFilename}
                </p>
                <p className="mt-1 text-xs text-cyan-200">
                    {getSimilarityLabel(result.similarityScore)} match
                </p>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-300">
                {formatBytes(fileNode.size)}
            </td>
            <td className="whitespace-nowrap px-4 py-3">
        <span className="text-sm font-semibold text-emerald-200">
          {formatBitrate(fileNode)}
        </span>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-300">
                {username}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-300">
                {formatTransferSpeed(uploadSpeed)}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right">
                <button
                    type="button"
                    className="focus-ring inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:bg-slate-700 disabled:text-slate-400"
                    onClick={() => onPlay(fileNode)}
                    disabled={isDownloading}
                >
                    {isDownloading ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true"/>
                    ) : (
                        <Play className="h-4 w-4" aria-hidden="true"/>
                    )}
                    Play
                </button>
            </td>
        </tr>
    );
}

export default ResultRow;