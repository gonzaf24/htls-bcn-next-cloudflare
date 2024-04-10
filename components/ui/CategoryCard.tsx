/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { AppConfig } from '@/config/appConfig';
import { Subcategory } from '@/lib/definitions';
import { useTranslation } from 'react-i18next';
import { cn, convertToUrlFriendly } from '@/lib/utils';
import styles from './CategoryCard.module.css';

export type CategoryCardProps = {
  categoryId: number;
  subcategory: Subcategory;
};

const categoryColorStyle = {
  [AppConfig.CATEGORIES.food.id]: styles.food,
  [AppConfig.CATEGORIES.bar.id]: styles.bar,
  [AppConfig.CATEGORIES.entertainment.id]: styles.entertainment,
};

const Categories = Object.values(AppConfig.CATEGORIES);

export default function CategoryCard({ categoryId, subcategory }: CategoryCardProps) {
  const { t } = useTranslation();
  const category = Categories.find((cat) => cat.id === categoryId) || {
    path: '',
  };
  const cardStyle = cn(
    'flex cursor-pointer flex-col items-center justify-center gap-2 rounded border px-4 py-2 hover:text-white',
    categoryColorStyle[categoryId],
  );

  return (
    <Link
      key={subcategory.id}
      href={`${category.path}/${convertToUrlFriendly(t(subcategory.t_name))}-${subcategory.id}`}
    >
      <li className="flex flex-col items-center justify-center p-4 sm:flex-row">
        <div className={cardStyle}>
          <img
            alt="subcategory icon"
            className="min-w-11 h-[80px] w-[80px] select-none sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px]"
            src={`${AppConfig.SUBCATEGORIES_PATH}/${subcategory.icon}`}
          />
          <h2 className="select-none whitespace-nowrap text-[9px] sm:text-[14px] lg:text-[16px]">
            {t(subcategory.t_name)}
          </h2>
        </div>
      </li>
    </Link>
  );
}
