import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

type State = {
  userInfo: ApiAuth.UserInfo | null;
  _hasHydrated: boolean;
  getters: {
    isLogin: boolean;
  };
};

type Actions = {
  setUserInfo: (arg: ApiAuth.UserInfo | null) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        userInfo: null,
        _hasHydrated: false,
        setUserInfo: (params) => {
          if (params) {
            set((state) => {
              Cookies.set('token', params.token, { secure: true });
              return { ...state, userInfo: params };
            });
          } else {
            set((state) => {
              return { ...state, userInfo: null };
            });
          }
        },
        setHasHydrated: (state) => {
          set({
            _hasHydrated: state
          });
        },
        clearUserInfo: () => {},
        getters: {
          get isLogin() {
            return !!get().userInfo;
          }
        }
      }),
      {
        name: 'userInfo',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => ['userInfo'].includes(key))
          ),
        onRehydrateStorage: () => {
          Cookies.remove('token');
          return (state) => {
            if (state) {
              const token = state.userInfo?.token;
              if (token) {
                Cookies.set('token', token, { secure: true });
              }
              state.setHasHydrated(true);
            }
          };
        }
      }
    ),
    { name: 'authStore' }
  )
);
