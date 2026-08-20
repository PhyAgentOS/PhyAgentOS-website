const API_BASE_URL = 'http://127.0.0.1:8001';

type RequestOptions = RequestInit & {
  token?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || 'Request failed');
  }

  return data as T;
}

export type AuthUser = {
  id: number;
  username: string;
  phone: string;
  email: string;
  created_at: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: 'bearer';
  user: AuthUser;
};

export async function sendVerificationCode(phone: string, purpose: 'register' | 'login') {
  return request<{ message: string; debug_code?: string | null }>('/api/auth/send-code', {
    method: 'POST',
    body: JSON.stringify({ phone, purpose }),
  });
}

export async function registerUser(payload: {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  code: string;
}) {
  return request<AuthUser>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginWithPassword(account: string, password: string) {
  return request<TokenResponse>('/api/auth/login/password', {
    method: 'POST',
    body: JSON.stringify({ account, password }),
  });
}

export async function loginWithCode(phone: string, code: string) {
  return request<TokenResponse>('/api/auth/login/code', {
    method: 'POST',
    body: JSON.stringify({ phone, code }),
  });
}

export async function getProfile(token: string) {
  return request<AuthUser>('/api/user/profile', {
    method: 'GET',
    token,
  });
}
