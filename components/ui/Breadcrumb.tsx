/* eslint-disable @next/next/no-img-element */
'use client';
import { Category, Subcategory } from '@/lib/definitions';
import styles from './Breadcrumb.module.css';
import { useTranslation } from 'react-i18next';
import { AppConfig } from '@/config/appConfig';
import Link from 'next/link';

type BreadcrumbProps = {
  category?: { name: string; icon: string };
  subcategory?: { id: number; name: string; icon: string };
  placeName?: string;
};

export default function Breadcrumb({ category, subcategory, placeName }: BreadcrumbProps) {
  const { t } = useTranslation();
  const categoryPath = t(category?.name || '').toLocaleLowerCase();
  const subcategoryPath = `${t(subcategory?.name || '').toLocaleLowerCase()}-${subcategory?.id}`;

  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.breadcrumbsItem} href={AppConfig.PATH.home}>
        <img
          src={`${AppConfig.PATH.categories}${AppConfig.APP_ROUTES.home.icon}`}
          alt="Map icon"
          className="h-6 w-3 sm:h-6 sm:w-6"
        />
        <p className="text-[9px] sm:text-lg">{t('map-title')}</p>
        <div className={styles.arrowRight}></div>
      </Link>
      {category && (
        <Link className={styles.breadcrumbsItem} href={`/${categoryPath}`}>
          <img
            src={`${AppConfig.PATH.categories}${category?.icon}`}
            alt="Category icon"
            className="h-6 w-3 sm:h-6 sm:w-6"
          />
          <p className="text-[9px] sm:text-lg">{t(category?.name || '')}</p>
          <div className={styles.arrowRight}></div>
        </Link>
      )}
      {subcategory && (
        <Link className={styles.breadcrumbsItem} href={`/${categoryPath}/${subcategoryPath}`}>
          <img
            src={`${AppConfig.PATH.subcategories}/${subcategory?.icon}`}
            alt="Sucategory icon"
            className="h-6 w-3 sm:h-6 sm:w-6"
          />
          <p className="text-[9px] sm:text-lg">{t(subcategory?.name)}</p>
          <div className={styles.arrowRight}></div>
        </Link>
      )}

      {placeName && (
        <div className={styles.breadcrumbsItem}>
          <p className="text-[9px] sm:text-lg">{t(placeName || '')}</p>
        </div>
      )}
    </div>
  );
}
