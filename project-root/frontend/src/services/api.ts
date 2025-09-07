import axios from 'axios';
import type { User, Post, CreateUserData, CreatePostData } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export const userApi = {
    getAll: async (): Promise<User[]> => {
        const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return response.data;
    },

    create: async (userData: CreateUserData): Promise<User> => {
        const response = await axios.post<User>(`${API_BASE_URL}/users`, userData);
        return response.data;
    },

    update: async (id: number, userData: CreateUserData): Promise<User> => {
        const response = await axios.put<User>(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    },
};

export const postApi = {
  
  getAll: async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
    return response.data;
  },

  getByUserId: async (userId: number): Promise<Post[]> => {
    const response = await axios.get<Post[]>(`${API_BASE_URL}/posts?userId=${userId}`);
    return response.data;
  },

  create: async (postData: CreatePostData): Promise<Post> => {
    const response = await axios.post<Post>(`${API_BASE_URL}/posts`, postData);
    return response.data;
  },

  update: async (id: number, postData: CreatePostData): Promise<Post> => {
    const response = await axios.put<Post>(`${API_BASE_URL}/posts/${id}`, postData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  },
};