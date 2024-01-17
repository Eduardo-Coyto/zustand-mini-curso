import { StateCreator, create } from "zustand";
import { AuthStatus, IUser } from "../../interfaces";
import { AuthServices } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface IAuthState {
  status: AuthStatus;
  token?: string;

  user?: IUser;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<IAuthState> = (set) => ({
  status: "pending",

  token: undefined,

  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthServices.login(email, password);
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
  checkAuthStatus: async() => {
    try {
      const {token, ...user} = await AuthServices.checkStatus();
      set({ status: 'authorized', token, user })
      
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined })
    }
  }, 
  logoutUser: () => {
    set({ status:'unauthorized', token: undefined, user: undefined })
  }
});

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(
            storeApi, {name: 'auth-storage'}
            )
        )
    );
