import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../constants/baseUrl";
import { AuthContext } from "./AuthContext";
import { type FC, type PropsWithChildren, useState, useEffect } from "react";
import type { DecryptedUser } from "../../types/DecryptedUser";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

//FC =React.FunctionComponent
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY),
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );

  const [myOrder, setMyOrder] = useState([]);
  const [user, setUser] = useState<DecryptedUser | null>(null);

  const isAuthenticated = !!token;

  const decodeToken = (currentToken: string | null) => {
    if (!currentToken) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode<DecryptedUser>(currentToken);
      setUser(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      decodeToken(token);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    decodeToken(token);
  };

  const isAdmin = user?.role === "admin";
  const isOwner = user?.role === "owner";

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
    setUser(null);
  };

  const getMyOrder = async () => {
    const response = await fetch(`${BASE_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();

    setMyOrder(data);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        isAuthenticated,
        myOrder,
        isAdmin,
        isOwner,
        user,
        decodeToken,
        login,
        logout,
        getMyOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
