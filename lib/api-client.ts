import axios from 'axios';
import { AIResponse, Message } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send message to AI companion and get response
 */
export const sendMessageToAI = async (
  messages: Message[],
  language: 'en' | 'ur' = 'en'
): Promise<AIResponse> => {
  try {
    const response = await apiClient.post('/api/ai/chat', {
      messages,
      language,
    });
    return response.data;
  } catch (error) {
    console.error('Error communicating with AI:', error);
    throw error;
  }
};

/**
 * Get a random dua
 */
export const getRandomDua = async () => {
  try {
    const response = await apiClient.get('/api/duas/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching dua:', error);
    throw error;
  }
};

/**
 * Save game score
 */
export const saveGameScore = async (
  gameId: string,
  score: number,
  metadata?: Record<string, any>
) => {
  try {
    const response = await apiClient.post('/api/games/score', {
      gameId,
      score,
      timestamp: new Date(),
      metadata,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving game score:', error);
    throw error;
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async (userId?: string) => {
  try {
    const response = await apiClient.get('/api/user/stats', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export default apiClient;
