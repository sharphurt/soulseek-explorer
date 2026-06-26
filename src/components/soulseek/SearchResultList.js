import {Loader2, Music2} from "lucide-react";
import {getFileNode} from "../../utils/getFileNode.js";
import SearchResultItem from "./SearchResultItem.js";
import {usePlayStream} from "../../hooks/usePlayStream.js";
import {useAddToLibrary} from "../../hooks/useAddToLibrary.js";

const SearchResultList = ({trackData, visibleResults, isInitializing, isPolling, onNotify}) => {
    const {downloadAndPlayKey, downloadAndPlay} = usePlayStream({selectedTrack: trackData, onNotify});
    const {downloadAndAddKey, downloadAndAdd} = useAddToLibrary({selectedTrack: trackData, onNotify});

    return (
        visibleResults.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                {isPolling || isInitializing
                    ? <Loader2 className="h-10 w-10 animate-spin text-cyan-300"/>
                    : <Music2 className="h-10 w-10 text-slate-500"/>}
                <p className="mt-3 text-sm font-medium text-slate-300">
                    {isPolling || isInitializing ? 'Collecting Soulseek results' : 'No files found'}
                </p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full table-fixed text-left">
                    <thead
                        className="border-b border-white/10 bg-slate-950/55 text-xs uppercase tracking-[0.14em] text-slate-500">
                    <tr>
                        <th className="w-36 px-4 py-3 text-right font-semibold"></th>
                        <th className="px-4 py-3 font-semibold">Filename</th>
                        <th className="w-32 px-4 py-3 font-semibold">Size</th>
                        <th className="w-32 px-4 py-3 font-semibold">Bitrate</th>
                        <th className="w-36 px-4 py-3 font-semibold">Extension</th>
                        <th className="w-32 px-4 py-3 font-semibold">Speed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleResults.map((result) => {
                        const fileNode = getFileNode(result);
                        const rowKey = `${fileNode.username ?? fileNode.userName ?? fileNode.user}-${fileNode.filename}`;
                        return (
                            <SearchResultItem
                                key={rowKey}
                                result={result}
                                onAdd={downloadAndAdd}
                                onPlay={downloadAndPlay}
                                isDownloading={downloadAndAddKey === rowKey || downloadAndPlayKey === rowKey}
                            />
                        );
                    })}
                    </tbody>
                </table>
            </div>
        ));
}

export default SearchResultList;