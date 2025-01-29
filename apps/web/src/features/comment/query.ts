import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query";
import { getPosts } from "./api";

export const usePostsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.posts(),
    queryFn: () => getPosts().then((res) => res.data),
  });
};
