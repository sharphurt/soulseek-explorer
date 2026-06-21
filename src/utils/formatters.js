export function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(milliseconds || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function formatBytes(bytes) {
  const value = Number(bytes);

  if (!Number.isFinite(value) || value <= 0) {
    return '0.0 MB';
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatTransferSpeed(bytesPerSecond) {
  const value = Number(bytesPerSecond);

  if (!Number.isFinite(value) || value <= 0) {
    return '0 KB/s';
  }

  const mb = value / (1024 * 1024);

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB/s`;
  }

  return `${(value / 1024).toFixed(1)} KB/s`;
}

export function getBaseFilename(filename = '') {
  const parts = String(filename).split(/[\\/]+/);

  return parts[parts.length - 1] || filename || 'Unknown file';
}

export function getFileExtension(fileNode = {}) {
  const explicit = String(fileNode.extension || '')
    .replace('.', '')
    .trim()
    .toUpperCase();

  if (explicit) {
    return explicit;
  }

  const filename = getBaseFilename(fileNode.filename || '');
  const match = filename.match(/\.([a-z0-9]+)$/i);

  return match ? match[1].toUpperCase() : 'UNKNOWN';
}

export function getBitrate(fileNode = {}) {
  const raw =
    fileNode.bitRate ??
    fileNode.bitrate ??
    fileNode.kbps ??
    fileNode.bitRateKbps ??
    fileNode.bitrateKbps;

  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value > 10000 ? Math.round(value / 1000) : Math.round(value);
}

export function formatBitrate(fileNode = {}) {
  const bitrate = getBitrate(fileNode);

  return bitrate ? `${bitrate} kbps` : 'Unknown';
}



export function getTrackId(track = {}) {
  return (
    track.iTunesId ??
    track.itunesId ??
    track.trackId ??
    track.id ??
    track.entityId ??
    null
  );
}
