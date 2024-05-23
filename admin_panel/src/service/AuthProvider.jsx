import React, { useContext, createContext } from 'react';

const AuthContext = createContext();
export default function AuthProvider({children}) {
    const loggedIn = false;

  return (
    <AuthContext.Provider value={loggedIn}>{children}</AuthContext.Provider>
  )
}

export const useAuth  = () => {
    return useContext(AuthContext);
}