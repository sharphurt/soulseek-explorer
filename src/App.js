import {useCallback, useState} from 'react';
import {Download, Headphones} from 'lucide-react';
import DownloadSidebar from './components/download/DownloadSidebar.js';
import SoulseekResultsView from './views/SoulseekResultsView';
import TrackSearchView from './views/TrackSearchView';
import {PlayerProvider} from "./context/PlayerContext.js";
import {AppLayoutProvider, useAppLayout} from "./context/LayoutContext.js";
import {DownloadProvider} from "./context/DownloadContext.js";
import {Route, Routes, useNavigate} from 'react-router-dom';


function AppShell() {
    const {isDownloadsOpen, openSidebar, closeSidebar} = useAppLayout();
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const notify = useCallback((nextToast) => {
        setToast({
            id: Date.now(),
            ...nextToast,
        });
    }, []);

    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        navigate('/soulseek', {state: {selectedTrack: track}});
    };

    const handleBack = () => {
        navigate(-1);
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
                                        {selectedTrack
                                            ? 'Search'
                                            : selectedTrack?.title || 'Soulseek files'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="transition-opacity duration-300">
                        <Routes>
                            <Route
                                path="/"
                                element={<TrackSearchView onSelectTrack={handleSelectTrack}/>}
                            />
                            <Route
                                path="/soulseek"
                                element={<SoulseekResultsView onBack={handleBack} onNotify={notify}/>}
                            />
                        </Routes>
                    </div>
                </main>

                <DownloadSidebar
                    isOpen={isDownloadsOpen}
                    onClose={closeSidebar}
                    onNotify={notify}
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
