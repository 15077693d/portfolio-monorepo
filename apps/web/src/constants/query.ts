import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
// Create a client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: import.meta.env.VITE_APP_ENV === 'dev' ? 0 : 2,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
})
export const QUERY_KEYS = {
    visitorComments: () => ['/visitor-comments'],
}
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})
