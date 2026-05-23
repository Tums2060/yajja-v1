import Constants from 'expo-constants';
import { Platform } from 'react-native';

type ApiResponse<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};

function getApiBaseUrl() {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000';
  }

  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants.manifest as { debuggerHost?: string } | null)?.debuggerHost ||
    'localhost:5000';
  const host = hostUri.split(':')[0];

  return `http://${host}:5000`;
}

export async function postJson<T>(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  let payload: T | undefined;
  let error: string | undefined;

  try {
    const data = (await response.json()) as { message?: string } & T;
    payload = data;
    if (!response.ok) {
      error = data.message || 'Request failed.';
    }
  } catch {
    if (!response.ok) {
      error = 'Request failed.';
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data: payload,
    error,
  } satisfies ApiResponse<T>;
}
