import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContextType, ISession } from "~/interfaces/auth";
import { endpoints } from "~/services/api";

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  signin: async () => { },
  signout: () => { },
};

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext(initialAuthContext);

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ISession | null>(null);
  const navigate = useNavigate()

  const signin = async (email: string, password: string) => {
    const options = { headers: { accept: '*/*', 'Content-Type': 'application/json' } }
    const { data: access_token } = await axios.post(endpoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookies.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endpoints.auth.profile);
      setUser(user);
    }
  };

  const signout = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.authorization;
    setIsAuthenticated(false);
    return navigate('/login')
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
