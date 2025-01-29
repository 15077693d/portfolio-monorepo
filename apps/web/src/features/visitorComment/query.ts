import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/query'
import { getVisitorComments } from './api'

export const useVisitorComments = () => {
    return useQuery({
        queryKey: QUERY_KEYS.visitorComments(),
        queryFn: () => getVisitorComments().then((res) => res.data),
    })
}
