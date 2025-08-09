import axios from 'axios';
import { ACCESS_TOKEN, USER_INFORMATION } from '@/constants/config';
import { getStorage, removeStorage } from '@/helpers/helper';
import { store } from '@/store/store';
import { userActions } from '@/slices/user';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
});

// REQUEST: gắn Bearer token từ localStorage
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = getStorage(ACCESS_TOKEN);
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// RESPONSE: nếu 401 -> clear storage + logout + về /login
api.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error?.response?.status;
        if (status === 401 && typeof window !== 'undefined') {
            const token = getStorage(ACCESS_TOKEN);
            if (token) {
                store.dispatch(userActions.signOut());
                removeStorage(ACCESS_TOKEN);
                removeStorage(USER_INFORMATION);
                const onLogin = window.location.pathname.startsWith('/login');
                if (!onLogin) window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Helpers
export const sendGet = (url: string, params?: any) => api.get(url, { params });
export const sendPost = (url: string, data?: any) => api.post(url, data);
export const sendPatch = (url: string, data?: any) => api.patch(url, data);
export const sendDelete = (url: string, params?: any) => api.delete(url, { params });
