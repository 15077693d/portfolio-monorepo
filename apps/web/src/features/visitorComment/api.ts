import { apiClient } from '../../constants/query'

export type VisitorComment = {
    id: string
    name: string
    content: string
    timestamp: number
}

export const getVisitorComments = () =>
    apiClient.get<VisitorComment[]>('/visitor-comment')
