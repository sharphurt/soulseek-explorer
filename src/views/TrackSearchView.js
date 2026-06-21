import { useMemo, useState } from 'react';
import {
  Clock3,
  Disc3,
  Loader2,
  Music2,
  Search,
  ServerCrash,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../utils/api';
import { formatDuration, getTrackId } from '../utils/formatters';

function getArtwork(track) {
  if (!Array.isArray(track.imageUrls)) {
    return '';
  }

  return track.imageUrls.find(Boolean) || '';
}

function TrackArtwork({ track }) {
  const [didFail, setDidFail] = useState(false);
  const artwork = getArtwork(track);

  if (!artwork || didFail) {
    return (
      <div className="flex aspect-square h-full w-full items-center justify-center bg-slate-800 text-slate-500">
        <Music2 className="h-10 w-10" aria-hidden="true" />
      </div>
    );
  }

  console.log(artwork);

  return (
    <img
      src={artwork}
      alt=""
      className="aspect-square h-full w-full object-cover"
      loading="lazy"
      onError={() => setDidFail(true)}
    />
  );
}

function TrackCard({ track, onSelectTrack }) {
  const trackId = getTrackId(track);
  const genres = Array.isArray(track.genres) ? track.genres.filter(Boolean) : [];

  return (
    <article className="group flex min-h-[230px] flex-col overflow-hidden rounded-lg border border-white/10 bg-slate-900/65 shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-900/90 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden">
        <TrackArtwork track={track} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/88 to-transparent p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <Clock3 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
            {formatDuration(track.duration)}
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white">
            {track.title || 'Untitled track'}
          </h3>
          <p className="mt-1 truncate text-sm text-slate-300">
            {track.artistName || 'Unknown artist'}
          </p>
          {track.albumName ? (
            <p className="mt-1 truncate text-xs text-slate-500">{track.albumName}</p>
          ) : null}
        </div>

        {genres.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[11px] font-medium text-emerald-100"
              >
                {genre}
              </span>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className="focus-ring mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:bg-slate-700 disabled:text-slate-400"
          onClick={() => onSelectTrack(track)}
          disabled={!trackId}
          title={trackId ? 'Search files on Soulseek' : 'Missing iTunesId'}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Search Files on Soulseek</span>
        </button>
      </div>
    </article>
  );
}

export default function TrackSearchView({ onSelectTrack }) {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resultCount = useMemo(() => tracks.length, [tracks]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const payload = await apiRequest('/search/track', {
        method: 'POST',
        body: JSON.stringify({
          query: trimmedQuery,
          page: 1,
          limit: 100,
          type: 'TRACK',
        }),
      });

      setTracks(Array.isArray(payload?.entities) ? payload.entities : []);
    } catch (searchError) {
      setTracks([]);
      setError(searchError.message || 'Track search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Track Search
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Find a track
            </h1>
          </div>

          <form className="flex w-full flex-col gap-3 sm:flex-row xl:max-w-2xl" onSubmit={handleSubmit}>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search query</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring h-11 w-full rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-4 text-sm text-white placeholder:text-slate-500"
                placeholder="Artist, track, or album"
                autoComplete="off"
              />
            </label>
            <button
              type="submit"
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:bg-slate-700 disabled:text-slate-400"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="h-4 w-4" aria-hidden="true" />
              )}
              Search
            </button>
          </form>
        </div>

        <div className="mt-4 flex min-h-6 items-center gap-3 text-sm text-slate-400">
          {error ? (
            <span className="inline-flex items-center gap-2 text-rose-200">
              <ServerCrash className="h-4 w-4" aria-hidden="true" />
              {error}
            </span>
          ) : hasSearched ? (
            <span>{resultCount} tracks found</span>
          ) : (
            <span>Ready</span>
          )}
        </div>
      </div>

      {tracks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {tracks.map((track, index) => (
            <TrackCard
              key={getTrackId(track) || `${track.title}-${track.artistName}-${index}`}
              track={track}
              onSelectTrack={onSelectTrack}
            />
          ))}
        </div>
      ) : hasSearched && !isLoading && !error ? (
        <div className="glass-panel flex min-h-[260px] flex-col items-center justify-center rounded-xl px-6 text-center">
          <Disc3 className="h-10 w-10 text-slate-500" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-slate-300">No tracks found</p>
        </div>
      ) : null}
    </section>
  );
}
