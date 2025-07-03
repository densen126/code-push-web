export interface FetchResult {
    httpCode: number;
    text: string;
}

export async function parseResponse(response: Response): Promise<FetchResult> {
    const text = await response.text();
    return { httpCode: response.status, text };
}

export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 10000
): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        return await fetch(url, { ...options, credentials: 'include', signal: controller.signal });
    } finally {
        clearTimeout(id);
    }
}

export async function request(
    url: string,
    options: RequestInit = {},
    timeout: number = 10000
): Promise<FetchResult> {
    try {
        const response = await fetchWithTimeout(url, options, timeout);
        return await parseResponse(response);
    } catch (err: any) {
        if (err.name === 'AbortError') {
            return { httpCode: 0, text: '请求超时' };
        }
        return { httpCode: 0, text: '网络错误，请重试!' };
    }
}
