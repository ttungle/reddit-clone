import { create } from 'zustand';

type State = {
  user: any | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

type Action = {
  actions: {
    setUser: (user: State['user']) => void;
    setAccessToken: (accessToken: State['accessToken']) => void;
    setRefreshToken: (refreshToken: State['refreshToken']) => void;
    clearToken: () => void;
  };
};

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

export const useAuthStore = create<State & Action>((set, get) => ({
  user: undefined,
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('access_token') ?? '' : '',
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refresh_token') ?? '' : '',
  actions: {
    setUser: (user) => set(() => ({ user })),
    setAccessToken: (accessToken: State['accessToken']) => {
      set(() => ({ accessToken }));
      if (accessToken) localStorage.setItem('access_token', accessToken);
    },
    setRefreshToken: (refreshToken: State['refreshToken']) => {
      set(() => ({ refreshToken }));
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    },
    clearToken: () => {
      set(() => ({ user: undefined, accessToken: undefined, refreshToken: undefined }));
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    },
  },
}));

const userSelector = (state: ExtractState<typeof useAuthStore>) => state.user;
export const getUser = () => userSelector(useAuthStore.getState());
