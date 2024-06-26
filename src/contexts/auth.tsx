import { api, apiRoutes } from "@/services/api";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, LoginParams, LoginResponse, User } from "./auth-context";

const AuthContext = React.createContext<IAuthContext | null>(null);

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useContext should be inside the Provider");
  return context;
}

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [isUserLogged, setIsUserLogged] = React.useState<boolean | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  async function login(credentials: LoginParams) {
    try {
      const { data } = await api.post<LoginResponse>(
        apiRoutes.login,
        credentials,
      );

      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsUserLogged(false);
        setUser(null);
        throw new Error("E-mail e/ou senha incorretos!");
      }
      setIsUserLogged(false);
      setUser(null);
      throw new Error("Ocorreu um erro ao fazer o login. Tente novamente!");
    }
  }

  function logout() {
    setIsUserLogged(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    async function getProfile() {
      try {
        const { data } = await api.get<User>("/me");
        setIsUserLogged(true);
        setUser(data);
      } catch (error) {
        setIsUserLogged(false);
        setUser(null);
        throw new Error("Faça login novamente!");
      }
    }
    if (token) {
      getProfile();
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isUserLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
