import {ServerCrash} from "lucide-react";

const SearchStatus = ({error, hasSearched, count}) => {
    if (error) {

        return (
            <span className="inline-flex items-center gap-2 text-rose-200">
            <ServerCrash className="h-4 w-4" aria-hidden="true"/>
                {error}
        </span>
        );
    }
    if (hasSearched) {
        return <span>{count} tracks found</span>;
    }
}

export default SearchStatus;