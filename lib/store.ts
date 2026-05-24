import { create } from 'zustand';
import { Message, GameScore, UserSession } from './types';

interface Store {
  // AI Chat State
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  
  // Game State
  gameScores: GameScore[];
  addGameScore: (score: GameScore) => void;
  
  // User Session
  session: UserSession;
  updateSession: (updates: Partial<UserSession>) => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Sound State
  soundEnabled: boolean;
  toggleSound: () => void;
}

const useStore = create<Store>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  
  gameScores: [],
  addGameScore: (score) =>
    set((state) => ({ gameScores: [...state.gameScores, score] })),
  
  session: {
    visitedPages: [],
    messagesWithAI: 0,
    gamesPlayed: 0,
    totalScore: 0,
  },
  updateSession: (updates) =>
    set((state) => ({ session: { ...state.session, ...updates } })),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

export default useStore;
