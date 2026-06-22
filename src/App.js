import {useCallback, useState} from 'react';
import {Download, Headphones, ListMusic, PanelRightOpen, Search} from 'lucide-react';
import DownloadSidebar from './components/download/DownloadSidebar.js';
import SoulseekResultsView from './views/SoulseekResultsView';
import TrackSearchView from './views/TrackSearchView';
import {PlayerProvider} from "./context/PlayerContext.js";
import {AppLayoutProvider, useAppLayout} from "./context/LayoutContext.js";
import {Views} from "./views/Views.js";
import {DownloadProvider} from "./context/DownloadContext.js";

function AppShell() {
    const {activeView, isDownloadsOpen, openSidebar, closeSidebar, setActiveView} = useAppLayout();
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [toast, setToast] = useState(null);
    const notify = useCallback((nextToast) => {
        setToast({
            id: Date.now(),
            ...nextToast,
        });
    }, []);

    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        setActiveView(Views.SOULSEEK_RESULT);
    };

    const handleBackToSearch = () => {
        setActiveView(Views.SEARCH_TRACK);
    };

    return (
        <div className="min-h-dvh text-slate-100">
            <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_390px]">
                <main className="min-w-0">
                    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
                        <div
                            className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                                    <Headphones className="h-5 w-5" aria-hidden="true"/>
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Soulseek Discovery
                                    </p>
                                    <p className="truncate text-xs text-slate-500">
                                        {activeView === Views.SEARCH_TRACK
                                            ? 'Search catalog'
                                            : selectedTrack?.title || 'Soulseek files'}
                                    </p>
                                </div>
                            </div>

                            <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
                                <button
                                    type="button"
                                    className={`focus-ring inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                                        activeView === Views.SEARCH_TRACK
                                            ? 'bg-emerald-300 text-slate-950'
                                            : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                                    onClick={handleBackToSearch}
                                >
                                    <Search className="h-4 w-4" aria-hidden="true"/>
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className={`focus-ring inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                                        activeView === Views.SOULSEEK_RESULT
                                            ? 'bg-cyan-300 text-slate-950'
                                            : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:text-slate-600'
                                    }`}
                                    onClick={() => setActiveView(Views.SOULSEEK_RESULT)}
                                    disabled={!selectedTrack}
                                >
                                    <ListMusic className="h-4 w-4" aria-hidden="true"/>
                                    Results
                                </button>
                            </nav>
                        </div>
                    </header>

                    <div className="transition-opacity duration-300">
                        {activeView === 'track-soulseek' ? (
                            <TrackSearchView onSelectTrack={handleSelectTrack}/>
                        ) : selectedTrack ? (
                            <SoulseekResultsView
                                selectedTrack={selectedTrack}
                                onBack={handleBackToSearch}
                                onNotify={notify}
                            />
                        ) : (
                            <TrackSearchView onSelectTrack={handleSelectTrack}/>
                        )}
                    </div>
                </main>

                <DownloadSidebar
                    isOpen={isDownloadsOpen}
                    onClose={closeSidebar}
                />
            </div>

            <button
                type="button"
                className="focus-ring fixed bottom-5 right-5 z-20 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-200 lg:hidden"
                onClick={() => openSidebar()}
                aria-label="Open download manager"
            >
                <Download className="h-5 w-5" aria-hidden="true"/>
            </button>

            {/*<Toast toast={toast} onDismiss={() => setToast(null)}/>*/}
        </div>
    );
}

export default function App() {
    return (
        <AppLayoutProvider>
            <DownloadProvider>
                <PlayerProvider>
                    <AppShell/>
                </PlayerProvider>
            </DownloadProvider>
        </AppLayoutProvider>
    );
}
