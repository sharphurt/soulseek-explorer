export const API_BASE_URL =
    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api`;

export async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers);

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message =
            typeof payload === 'object' && payload !== null
                ? payload.message || payload.error || response.statusText
                : payload || response.statusText;

        throw new Error(message);
    }

    return {status: response.status, data: payload};
}
