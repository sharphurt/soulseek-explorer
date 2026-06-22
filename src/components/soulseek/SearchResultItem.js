import {
    formatBitrate,
    formatBytes,
    formatTransferSpeed,
    getBaseFilename,
    getFileExtension
} from "../../utils/formatters.js";
import {Loader2, Play, Plus} from "lucide-react";
import {getFileNode} from "../../utils/getFileNode.js";
import {getSimilarityLabel} from "../../utils/getSimilarityLabel.js";

const ResultRow = ({result, onPlay, isDownloading}) => {
    const fileNode = getFileNode(result);
    const filename = fileNode.filename || '';
    const baseFilename = getBaseFilename(filename);
    const extension = getFileExtension(fileNode);
    const uploadSpeed = fileNode.uploadSpeed ?? fileNode.speed ?? 0;

    return (
        <tr className="border-b border-white/5 transition hover:bg-white/[0.04]">
            <td className="whitespace-nowrap px-3 py-3 text-right">
                <button
                    type="button"
                    className="focus-ring inline-flex h-9 w-9 rounded-3xl items-center justify-center gap-2 mr-4 bg-indigo-300/10 px-3 text-indigo-100 text-sm font-semibold transition hover:bg-cyan-200 disabled:bg-slate-700 disabled:text-slate-400"
                    onClick={() => onPlay(fileNode)}
                    disabled={isDownloading}
                >
                    {isDownloading ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true"/>
                    ) : (
                        <Plus className="h-4 w-4" aria-hidden="true"/>
                    )}
                </button>
                <button
                    type="button"
                    className="focus-ring inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-indigo-300/10 px-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-300/20 disabled:bg-slate-700 disabled:text-slate-400"
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
            <td className="whitespace-nowrap px-4 py-3">
                <span
                    className="rounded-md border border-indigo-300/25 bg-indigo-300/10 px-2 py-1 text-xs font-semibold text-indigo-100">
                  {extension}
                </span>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-300">
                {formatTransferSpeed(uploadSpeed)}
            </td>
        </tr>
    );
}

export default ResultRow;