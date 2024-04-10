'use client';
import { Button } from '@nextui-org/react';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import { useUserContext } from '@/app/context/userContext';
import { isPlaceBookmarked } from '@/lib/actions';
import { useBookmarkContext } from '@/app/context/bookmarksContext';
import { useState, useEffect, useCallback } from 'react';
import styles from './BookmarkButton.module.css';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';

export function BookmarkButton({ placeId }: { placeId: number }) {
  const { isAuthenticated, user } = useUserContext();
  const { updateBookmark } = useBookmarkContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBookmarkedText, setShowBookmarkedText] = useState(false);
  const userId = user?.id.toString() || '';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      // Realizar la comprobación solo si el usuario está autenticado
      if (isAuthenticated) {
        setLoading(true);
        try {
          const _isBookmarked = await isPlaceBookmarked(placeId, userId);
          setIsBookmarked(_isBookmarked);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching bookmark status:', error);
        }
      }
    };
    fetchBookmarkStatus();
  }, [isAuthenticated, placeId, userId]); // Ejecutar solo cuando cambie la autenticación o el ID del lugar

  const handleBookmarkClick = useCallback(async () => {
    try {
      setLoading(true);
      if (isBookmarked) {
        setIsOpen(true); // Mostrar el diálogo de alerta si el lugar ya está marcado
        setLoading(false);
      } else {
        const _isBookmarked = await updateBookmark(placeId, !isBookmarked);
        setShowBookmarkedText(true);
        setIsBookmarked(_isBookmarked);
        setTimeout(() => {
          setShowBookmarkedText(false);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error bookmarking place:', error);
    }
  }, [isBookmarked, placeId, updateBookmark]);

  const handleConfirmRemoveBookmark = async () => {
    try {
      setLoading(true);
      setIsOpen(false); // Cerrar el diálogo de alerta
      const _isBookmarked = await updateBookmark(placeId, !isBookmarked);
      setShowBookmarkedText(true);
      setIsBookmarked(_isBookmarked);
      setTimeout(() => {
        setShowBookmarkedText(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  //TODO: translate needed
  const bookmarkedText = isBookmarked ? 'saved' : 'removed';

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <Button
        isDisabled={loading}
        onClick={handleBookmarkClick}
        className="hover:c_highlights_hover h-8 w-8 min-w-0 rounded-full bg-c_highlights p-[9px] shadow-md shadow-c_gray_20 transition-transform duration-300 "
      >
        {loading && <span className={styles.loader}></span>}
        {!loading && <BookmarkIcon color={isBookmarked ? 'black' : 'white'} />}
      </Button>
      {showBookmarkedText && (
        <p
          className={`${styles.textFocusIn} left-[30px]] absolute top-full mt-1 -translate-x-1/2 transform text-xs text-[#ffff]`}
        >
          {bookmarkedText}
        </p>
      )}
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover este lugar de tus Favoritos?</AlertDialogTitle>
            <AlertDialogDescription>Se eliminará este lugar de tus marcadores</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="focus:none" onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemoveBookmark}
              className="bg-c_highlights hover:bg-c_highlights_hover"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
