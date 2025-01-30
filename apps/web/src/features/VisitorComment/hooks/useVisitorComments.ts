import { useQuery } from '@tanstack/react-query'
import { VisitorComment } from 'database'
import { apiClient, QUERY_KEYS } from '../../../constants/query'

export const useVisitorComments = () => {
    return useQuery({
        queryKey: QUERY_KEYS.visitorComments(),
        queryFn: () =>
            apiClient
                .get<VisitorComment[]>('/visitor-comment')
                .then((res) => res.data),
    })
}
