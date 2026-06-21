import React, {createContext, useContext, useState} from 'react';

const PlayerContext = createContext(undefined);

export function PlayerProvider({children}) {
    const [activeStream, setActiveStream] = useState(null);

    const clearStream = () => setActiveStream(null);

    return (
        <PlayerContext.Provider value={{activeStream, setActiveStream, clearStream}}>
            {children}
        </PlayerContext.Provider>
    );
}

export function useStreamPlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('useStreamPlayer must be used within a PlayerProvider');
    }
    return context;
}