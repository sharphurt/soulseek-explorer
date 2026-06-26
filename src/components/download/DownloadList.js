import {Download, Loader2} from "lucide-react";
import DownloadItem from "./DownloadItem.js";

const DownloadList = ({downloads, isLoading}) => {
    if (isLoading && downloads.length === 0) {
        return (
            <div
                className="flex h-48 items-center justify-center rounded-lg border border-white/10 bg-slate-950/35 text-slate-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true"/>
                Loading downloads
            </div>
        );
    }

    if (downloads.length === 0) {
        return (
            <div
                className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-slate-950/35 px-6 text-center">
                <Download className="h-8 w-8 text-slate-500" aria-hidden="true"/>
                <p className="mt-3 text-sm font-medium text-slate-300">No active downloads</p>
            </div>
        );
    }

    const visibleByDefaultStatusRegexp = /inprogress|queued/i
    const inProgress = downloads.filter((download) => visibleByDefaultStatusRegexp.test(download.state));

    return (
        <div className="space-y-3">
            {
                inProgress.length > 0 ? (
                    <div>
                        {inProgress.map((download, index) => (
                            <DownloadItem
                                key={download.id ?? download.uuid ?? `${download.filename}-${index}`}
                                download={download}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex h-10 items-center justify-center text-slate-500'>
                        <span className='text-sm font-medium'>Нет активных загрузок</span>
                    </div>
                )
            }
            <details>
                <summary>Последние загрузки</summary>
                <div className='pt-2'>
                    {downloads.filter((download) => !visibleByDefaultStatusRegexp.test(download.state)).sort((download) => download.endedAt || download.startedAt).reverse().map((download, index) => (
                        <DownloadItem
                            key={download.id ?? download.uuid ?? `${download.filename}-${index}`}
                            download={download}
                        />
                    ))}
                </div>
            </details>
        </div>

    );
};

export default DownloadList;