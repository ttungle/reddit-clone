import { create } from 'zustand';

type State = {
  user: any | null | undefined;
  accessToken: string | undefined;
};

type Action = {
  setUser: (user: State['user']) => void;
  setAccessToken: (accessToken: State['accessToken']) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  user: null,
  accessToken: '',
  setUser: (user) => set(() => ({ user })),
  setAccessToken: (accessToken: State['accessToken']) => {
    set(() => ({ accessToken }));
    if (accessToken) localStorage.setItem('access_token', accessToken);
  },
}));
