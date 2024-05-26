import React from 'react';
import { useAuth } from '../service/AuthProvider';

export default function Login() {

  const auth = useAuth();

  return (
    <button onClick={() => {auth.loginFn()}}>Login</button>
  )
}
