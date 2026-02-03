import { create } from 'zustand';

interface ChatStore {
  isMessaging: boolean;
  setIsMessaging: (isMessaging: boolean) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isMessaging: false,
  setIsMessaging: (isMessaging) => set({ isMessaging }),
  isListening: false,
  setIsListening: (isListening) => set({ isListening }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
})); 