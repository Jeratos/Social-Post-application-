/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import {toast} from "react-toastify";

interface AppContextType {
  isLogin: boolean;
  login: (email: string, password: string) => Promise<any>;
  LogoutUser: () => void;
  register: (name: string, email: string, password: string) => Promise<any>;
}

export const Context = createContext<AppContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [, setUser] = useState(localStorage.getItem("user"));

  // store id to localstorage
  const storeIdInLS = (id: string) => {
    setUser(id);
    return localStorage.setItem("user", id);
  };
  const storeTokenInLS = (serverToken: string) => {
    setToken(serverToken);
    return localStorage.setItem("Token", serverToken);
  };

  const isLogin = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser("");

    localStorage.removeItem("Token");
    localStorage.removeItem("user");
  };

  async function login(email: string, password: string) {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // console.log(data);
      if (data.success==true) {
        storeTokenInLS(data.token);
        storeIdInLS(data.user);
        toast.success("Login successfully");
        return data;
      }else{
        toast.error("Login faild");
      }

    } catch (error) {
      toast.error("Invalid credentials");
      console.error(error);
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        // console.log(data);

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    login,
    isLogin,
    LogoutUser,
    register,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCont = () => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("useCont must be used within ContextProvider");
  }
  return contextValue;
};
