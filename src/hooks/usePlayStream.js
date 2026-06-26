import {useFileDownload} from "./useFileDownload.js";
import {useStreamPlayer} from "../context/PlayerContext.js";

export const usePlayStream = ({selectedTrack, onNotify}) => {
    const {setActiveStream} = useStreamPlayer({selectedTrack});

    const onSuccess = async (data, fileNode) => {
        if (!data) return;
        setActiveStream({
            uuid: data.uuid,
            displayName: selectedTrack.title || 'Unknown Track',
            artist: selectedTrack.artist || 'Unknown Artist',
            selectedTrack,
            fileNode
        });
    };

    const {downloadingKey, download} = useFileDownload({selectedTrack, intent: 'PLAY', onNotify, onSuccess});
    return {downloadAndPlayKey: downloadingKey, downloadAndPlay: download};
};