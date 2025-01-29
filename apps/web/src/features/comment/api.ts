import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  usersToGroups: Array<{
    userId: string | null;
    groupId: string | null;
    group: {
      id: string;
      name: string;
      // Add other group properties as needed
    } | null;
  }>;
}

export interface PostResponseType {
  id: string;
  title: string;
  content: string;
  authorId: string | null;
  author: User | null;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getPosts = () => apiClient.get<PostResponseType[]>("/post");
