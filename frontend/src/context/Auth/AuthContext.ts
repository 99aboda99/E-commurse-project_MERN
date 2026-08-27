import { createContext, useContext } from "react";
import type { MyOrder } from "../../types/MyOrder";
import type { DecryptedUser } from "../../types/DecryptedUser";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrder: MyOrder[];
  isAdmin: boolean;
  isOwner: boolean;
  user: DecryptedUser | null;
  decodeToken: (token: string | null) => void;
  login: (username: string, token: string) => void;
  logout: () => void;
  getMyOrder: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  myOrder: [],
  isAdmin: false,
  isOwner: false,
  user: null,
  decodeToken: () => {},
  login: () => {},
  logout: () => {},
  getMyOrder: async () => {},
});

export const useAuth = () => useContext(AuthContext);
