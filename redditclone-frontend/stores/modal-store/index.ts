import { create } from 'zustand';

type State = {
  showLoginModal: boolean;
};

type Action = {
  setShowLoginModal: (open: State['showLoginModal']) => void;
};

export const useModalStore = create<State & Action>((set) => ({
  showLoginModal: false,
  setShowLoginModal: (open) => set(() => ({ showLoginModal: open })),
}));
