import React, { createContext, useContext, useEffect, useState } from 'react';
import { load, save } from '../utils/storage';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../utils/mockApi';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth: user, isAuthenticated, login, register, logout */
  return useContext(AuthCtx);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => load('auth', null));
  useEffect(() => { save('auth', session); }, [session]);

  const isAuthenticated = !!session?.user;

  async function login(email, password) {
    const user = await apiLogin(email, password);
    setSession({ user, token: 'mock-token' });
    return user;
  }
  async function register(name, email, password) {
    const user = await apiRegister(name, email, password);
    setSession({ user, token: 'mock-token' });
    return user;
  }
  async function logout() {
    await apiLogout();
    setSession(null);
  }

  return (
    <AuthCtx.Provider value={{ user: session?.user || null, isAuthenticated, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
