import axios from 'axios'

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
