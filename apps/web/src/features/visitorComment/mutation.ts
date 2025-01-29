import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateVisitorCommentDto } from 'database'
import { apiClient, QUERY_KEYS } from '../../constants/query'

export const usePostComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (commentData: CreateVisitorCommentDto) =>
            apiClient.post('/visitor-comment', commentData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.visitorComments(),
            })
        },
    })
}
