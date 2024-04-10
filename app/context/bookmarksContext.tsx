/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { FC, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Place } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';
import { useUserContext } from './userContext';
import { BookmarksContextType, ProviderProps } from '@/lib/definitions';
import { fetchBookmarkedPlaces, fetchPlace, updateBookmarkStatus } from '@/lib/actions';

// Define el contexto
const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  updateBookmark: async () => false,
  isLoading: false,
});

// Hook personalizado para consumir el contexto
export const useBookmarkContext = (): BookmarksContextType => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarkContext debe ser utilizado dentro de un BookmarkProvider');
  }
  return context;
};

// Proveedor de contexto para manejar los marcadores
export const BookmarksProvider: FC<ProviderProps> = ({ children, locale }) => {
  const { data: session } = useSession();
  const { user } = useUserContext();
  const userId = user?.id || '';
  const [isLoading, setIsLoading] = useState(false);

  // Estado local para almacenar los marcadores
  const [bookmarks, setBookmarks] = useState<Place[]>([]);

  // Cargar marcadores al montar el componente
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (session && userId !== '') {
        setIsLoading(true);
        const _places = (await fetchBookmarkedPlaces(userId, locale)) as Place[];
        setBookmarks(_places);
        setIsLoading(false);
      }
    };
    fetchBookmarks();
  }, [userId]);

  // Función para actualizar un marcador
  const updateBookmark = useCallback(
    async (placeId: number, isBookmarked: boolean) => {
      const response = await updateBookmarkStatus(placeId, userId, isBookmarked);
      if (response.success) {
        if (isBookmarked) {
          // si isBookmarked es true , entonces agregar el place a bookmarks
          const _place = await fetchPlace(placeId, locale);
          setBookmarks([...bookmarks, { ..._place } as Place]);
        } else {
          // si isBookmarked es false, entonces eliminar el place de bookmarks por el id
          const _updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== placeId);
          setBookmarks(_updatedBookmarks);
        }
      }
      return response.isBookmarked || false;
    },
    [bookmarks, locale, userId],
  );

  // Proporciona el contexto y sus valores a través del componente Provider
  return (
    <BookmarksContext.Provider value={{ bookmarks, updateBookmark, isLoading }}>
      {children}
    </BookmarksContext.Provider>
  );
};
