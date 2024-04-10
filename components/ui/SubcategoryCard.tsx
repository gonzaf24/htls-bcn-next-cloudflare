/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import Link from 'next/link';
import { Place } from '@/lib/definitions';
import { AppConfig } from '@/config/appConfig';
import { useTranslation } from 'react-i18next';
import { BookmarkButton } from './BookmarkButton';
import { convertToUrlFriendly } from '@/lib/utils';
import styles from './CategoryCard.module.css';

export type SubcategoryCardProps = {
  place: Place;
};

const categoryColorStyle = {
  [AppConfig.CATEGORIES.food.id]: styles.food,
  [AppConfig.CATEGORIES.bar.id]: styles.bar,
  [AppConfig.CATEGORIES.entertainment.id]: styles.entertainment,
};

const APP_ROUTES = Object.values(AppConfig.APP_ROUTES);

export const SubcategoryCard: React.FC<SubcategoryCardProps> = ({ place }) => {
  const { t } = useTranslation();

  return (
    <li className="relative flex flex-col p-4 sm:flex-row">
      <div className="absolute bottom-0 right-0 right-0 top-0 z-10 rounded">
        <BookmarkButton placeId={place.id} />
      </div>
      <Link
        href={`${APP_ROUTES[place.categories[0]].path}/${convertToUrlFriendly(
          t(place.subcategoryName),
        )}/${convertToUrlFriendly(place.name)}-${place.id}`}
      >
        <div
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 p-2 hover:text-white ${
            categoryColorStyle[place.categories[0]]
          }`}
        >
          <img
            alt="subcategory icon"
            className="min-w-11 h-[80px] w-[80px] select-none sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px]"
            src={place.photos[0]}
          />
          <h2 className="select-none text-[9px] sm:text-[14px] lg:text-[16px]">{place.name}</h2>
        </div>
      </Link>
    </li>
  );
};
