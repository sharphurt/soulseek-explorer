import {createContext, useContext, useState,} from 'react';

const LayoutContext = createContext(null);

export function AppLayoutProvider({children}) {
    const [activeView, setActiveView] = useState('track-search');
    const [isDownloadsOpen, setIsDownloadsOpen] = useState(false)

    const closeSidebar = () => setIsDownloadsOpen(false);
    const openSidebar = () => setIsDownloadsOpen(true);

    return (
        <LayoutContext.Provider value={{activeView, isDownloadsOpen, closeSidebar, openSidebar, setActiveView}}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useAppLayout() {
    const context = useContext(LayoutContext);

    if (!context) {
        throw new Error('useLayout must be used within LayoutProvider');
    }

    return context;
}
