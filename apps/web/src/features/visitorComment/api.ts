import { VisitorComment } from 'database'
import { apiClient } from '../../constants/query'

export const getVisitorComments = () =>
    apiClient.get<VisitorComment[]>('/visitor-comment')
