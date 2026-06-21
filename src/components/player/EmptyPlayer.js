import {Music} from "lucide-react";

const EmptyPlayer = () => {
    return (
        <div
            className="flex h-20 items-center justify-center border-t border-white/10 bg-slate-900 px-4 text-slate-500">
            <Music className="mr-2 h-5 w-5"/>
            <span className="text-sm font-medium">No track playing</span>
        </div>
    );
};

export default EmptyPlayer;