/* eslint-disable @next/next/no-img-element */
import { AppConfig } from '@/config/appConfig';
import { ImageLogoProps } from '@/lib/definitions';
import { IconCategorySkeleton } from '@/components/ui/Skeletons';
import styles from './ImageLogo.module.css';

const bgColorsMap = {
  [AppConfig.CATEGORIES.food.id]: styles.food,
  [AppConfig.CATEGORIES.bar.id]: styles.bar,
  [AppConfig.CATEGORIES.entertainment.id]: styles.entertainment,
};

export const ImageLogo = ({
  isCategory,
  categoryId,
  src,
  alt,
  className,
}: ImageLogoProps & { isCategory: boolean }) => {
  return (
    <div className={className}>
      {src ? (
        <img
          alt={alt}
          className={`h-8 w-8 rounded-sm p-1 shadow-md shadow-c_gray_20  ${bgColorsMap[categoryId]}`}
          src={`${isCategory ? AppConfig.CATEGORIES_PATH : AppConfig.SUBCATEGORIES_PATH}/${src}`}
        />
      ) : (
        <IconCategorySkeleton />
      )}
    </div>
  );
};
