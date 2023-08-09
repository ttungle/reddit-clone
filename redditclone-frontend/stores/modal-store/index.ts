import { create } from 'zustand';

type State = {
  showLoginModal: boolean;
  showCreateSubredditModal: boolean;
};

type Action = {
  actions: {
    setShowLoginModal: (open: State['showLoginModal']) => void;
    setShowCreateSubredditModal: (open: State['showCreateSubredditModal']) => void;
  };
};

export const useModalStore = create<State & Action>((set) => ({
  showLoginModal: false,
  showCreateSubredditModal: false,
  actions: {
    setShowLoginModal: (open) => set(() => ({ showLoginModal: open })),
    setShowCreateSubredditModal: (open) => set(() => ({ showCreateSubredditModal: open })),
  },
}));
