import { BASE_URL } from "../../constants/baseUrl";
import { AuthContext } from "./AuthContext";
import { type FC, type PropsWithChildren, useState } from "react";

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

  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
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
