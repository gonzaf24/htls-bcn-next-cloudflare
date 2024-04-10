/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { createContext, useContext, useState, FC, useEffect } from 'react';
import { fetchUser } from '@/lib/actions';
import { AppConfig } from '@/config/appConfig';
import { UserData } from '@/lib/interfaces';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ProviderProps, UserContextType } from '@/lib/definitions';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: async () => {},
});

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider: FC<ProviderProps> = ({ children, locale }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;
  const [isFetchingUser, setIsFetchingUser] = useState(false); // var to track if a fetch is in progress

  useEffect(() => {
    const storedUserData = getCookie(AppConfig.COOKIE_USER_KEY_NAME);
    const fetchUserIfNeeded = async () => {
      if (!user && session && !isFetchingUser) {
        setIsFetchingUser(true); // fetch in progress
        const userData = await fetchUser(session?.user?.email as string);
        setCookie(AppConfig.COOKIE_USER_KEY_NAME, JSON.stringify(userData));
        setUser(userData);
        setIsFetchingUser(false); // fetch is done
      }
    };

    if (storedUserData && !user) {
      const userData: UserData = JSON.parse(storedUserData);
      setUser(userData);
    } else {
      fetchUserIfNeeded();
    }
  }, [session, user, isFetchingUser]);

  const login = async () => {
    try {
      await signIn('google'); // Inicia sesión utilizando el proveedor de Google
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = async () => {
    try {
      deleteCookie(AppConfig.COOKIE_USER_KEY_NAME);
      await signOut(); // Cierra la sesión del usuario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
