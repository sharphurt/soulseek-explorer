import {Activity, PanelRightClose} from 'lucide-react';
import {useDownloads} from '../../context/DownloadContext.js';
import SidebarPlayer from '../player/SidebarPlayer.js';
import DownloadList from "./DownloadList.js";

const DownloadSidebar = ({isOpen, onClose, onNotify}) => {
    const {downloads, error, isLoading} = useDownloads();

    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition-opacity lg:hidden
                    ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                className={`glass-panel fixed right-0 top-0 z-40 flex h-dvh w-full max-w-[390px] flex-col border-y-0 border-r-0 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Download manager"
            >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-emerald-300" aria-hidden="true"/>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
                                Downloads
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" className="icon-button lg:hidden" onClick={onClose}>
                            <PanelRightClose className="h-4 w-4"/>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                    {error && (
                        <div
                            className="mb-4 rounded-lg border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">
                            {error}
                        </div>
                    )}
                    <DownloadList downloads={downloads} isLoading={isLoading}/>
                </div>

                <div className="shrink-0">
                    <SidebarPlayer onNotify={onNotify}/>
                </div>
            </aside>
        </>
    );
};

export default DownloadSidebar;