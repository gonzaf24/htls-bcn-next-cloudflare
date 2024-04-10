'use client';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { SubcategoryNameProps } from '@/lib/definitions';
import { StylesConfig } from '@/config/stylesConfig';

export const SubcategoryName = ({ categoryId, subcategoryName, className }: SubcategoryNameProps) => {
  const { t } = useTranslation();

  const textSize = cn('text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6', className);

  return (
    <p
      style={{
        color: StylesConfig.CATEGORIES_COLORS[categoryId] || 'black',
      }}
      className={textSize}
    >
      {t(subcategoryName)}
    </p>
  );
};
