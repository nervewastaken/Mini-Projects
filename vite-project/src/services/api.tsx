// src/services/api.ts

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
