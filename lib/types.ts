// Type definitions for the entire application

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  message: string;
  emotion: 'peaceful' | 'wise' | 'comforting' | 'encouraging';
  includesDua: boolean;
  language: 'en' | 'ur';
}

export interface Memory {
  id: string;
  quality: 'kindness' | 'loyalty' | 'warmth' | 'patience' | 'caring' | 'strength';
  message: string;
  emoji: string;
}

export interface Wish {
  id: string;
  text: string;
  dua: string;
  category: 'health' | 'happiness' | 'success' | 'peace' | 'barakah';
}

export interface GameScore {
  gameId: string;
  score: number;
  timestamp: Date;
}

export interface UserSession {
  visitedPages: string[];
  messagesWithAI: number;
  gamesPlayed: number;
  totalScore: number;
}
