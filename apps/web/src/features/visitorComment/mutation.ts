import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateVisitorComment } from 'database'
import { apiClient, QUERY_KEYS } from '../../constants/query'

export const usePostComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (commentData: CreateVisitorComment) =>
            apiClient.post('/visitor-comment', commentData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.visitorComments(),
            })
        },
    })
}
