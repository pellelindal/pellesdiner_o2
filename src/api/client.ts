import { API_BASE_URL } from '../config/api';

type RequestOptions = RequestInit & {
  json?: unknown;
};

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
    ...rest,
  });

  if (!response.ok) {
    const message = await safeParseError(response);
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function safeParseError(response: Response) {
  try {
    const data = await response.json();
    if (data?.message) {
      return data.message as string;
    }
    return JSON.stringify(data);
  } catch {
    return response.statusText || `Request failed with status ${response.status}`;
  }
}
