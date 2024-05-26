import React, { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default function AuthProvider({children}) {
    const[login, setLogin] = useState(false);
    const navigate = useNavigate();

    const loginFn = () => {
      setLogin(true);
      navigate("/");
    }

    const logout = () => {
      setLogin(false);
      navigate("/login");
    }

  return (
    <AuthContext.Provider value={{login,loginFn,logout}}>{children}</AuthContext.Provider>
  )
}

export const useAuth  = () => {
    return useContext(AuthContext);
}