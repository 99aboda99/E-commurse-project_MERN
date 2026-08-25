import { createContext, useContext } from "react";
import type { MyOrder } from "../../types/MyOrder";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrder: MyOrder[];
  login: (username: string, token: string) => void;
  logout: () => void;
  getMyOrder: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  myOrder: [],
  login: () => {},
  logout: () => {},
  getMyOrder: async () => {},
});

export const useAuth = () => useContext(AuthContext);
