/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { ImageLogo } from '@/components/ui/ImageLogo';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { useTranslation } from 'react-i18next';
import { SubcategoryName } from '@/components/ui/SubcategoryName';
import { useBookmarkContext } from '@/app/context/bookmarksContext';
import { CategoriesSkeleton } from '@/components/ui/Skeletons';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { AppConfig } from '@/config/appConfig';

export default function BookmarksPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation();

  const { bookmarks, isLoading } = useBookmarkContext();

  const bookmarksParam = {
    name: AppConfig.BOOKMARKS.t_name,
    path: AppConfig.BOOKMARKS.path,
    icon: AppConfig.BOOKMARKS.icon,
  };

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <main className="flex w-full flex-col items-start justify-start p-4">
      <Breadcrumb category={bookmarksParam} />
      <ul className="mt-6 flex flex-wrap gap-4 p-4">
        {bookmarks.map((place) => (
          <li
            key={place.id}
            className="relative w-1/2 min-w-[250px] rounded-md border-1 border-[var(--c-highlights)] p-4 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="absolute right-[0px] top-[0px] flex w-full items-center justify-between rounded-t-md bg-black p-2">
              <div className="flex items-center justify-start gap-2">
                <ImageLogo
                  isCategory={true}
                  categoryId={place.categories[0]}
                  src={place.categoryIcon}
                  alt="Category icon"
                />
                <ImageLogo
                  isCategory={false}
                  categoryId={place.categories[0]}
                  src={place.subcategoryIcon}
                  alt="Subcategory icon"
                />
                <SubcategoryName
                  categoryId={place.categories[0]}
                  subcategoryName={place.subcategoryName}
                  className={'text-md sm:text-md md:text-md lg:text-md xl:text-md'}
                />
              </div>
              <BookmarkButton placeId={place.id} />
            </div>
            <img src={place.photos[0]} alt={place.name} className="rounded-t-md" />
            <h2 className="p-2">{place.name}</h2>
            <Link href={`/place/${place.id}`} passHref>
              <div className="flex items-center justify-center rounded-b bg-[var(--c-highlights)] px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600">
                Go to place
              </div>
            </Link>
          </li>
        ))}
        {!bookmarks.length && (
          <div className="flex h-[30vh] w-full items-center justify-center">
            <h1 className="text-xl">{t('No bookmarks yet')}</h1>
          </div>
        )}
      </ul>
    </main>
  );
}
