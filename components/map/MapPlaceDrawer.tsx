/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react';

import Link from 'next/link';
import Carousel from '@/components/ui/Carousel';
import { Button } from '@nextui-org/react';
import { ImageLogo } from '@/components/ui/ImageLogo';
import { useTranslation } from 'react-i18next';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { SubcategoryName } from '@/components/ui/SubcategoryName';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/DrawerModal';
import { DrawerProps } from '@/lib/definitions';

export function MapPlaceDrawer({ isOpen, setIsPlaceDrawerOpen, place, onClose }: DrawerProps) {
  const { t } = useTranslation();

  const handleCloseDrawer = useCallback(() => {
    setIsPlaceDrawerOpen(false);
    onClose();
  }, [setIsPlaceDrawerOpen, onClose]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsPlaceDrawerOpen} onClose={onClose}>
      <DrawerContent>
        {place && (
          <div className="max-w-xxl mx-auto mb-[30px] w-full">
            <DrawerHeader>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
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
                  <SubcategoryName categoryId={place.categories[0]} subcategoryName={place.subcategoryName} />
                </div>
                <div>
                  <p className="xl:text-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{place.name}</p>
                </div>
              </div>
              <div className="absolute -top-[18px] right-[70px]">
                <BookmarkButton placeId={place.id} />
              </div>
              <Button
                onClick={handleCloseDrawer}
                className="hover:c_highlights_hover absolute -top-[22px] right-[20px] h-10 w-10 min-w-0 rounded-full bg-c_highlights p-3 shadow-md shadow-c_gray_20 transition-transform duration-300 "
              >
                <img className="h-3 w-3" alt="close modal image" src="/CloseIcon.svg" />
              </Button>
            </DrawerHeader>
            <div className="flex min-h-[100px] flex-col gap-4 p-4 pb-4 sm:min-h-[250px] sm:flex-row">
              <div className="flex h-full max-w-[650px] items-center justify-center">
                <Carousel photos={place.photos} />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <p className="max-h-28 max-w-prose overflow-auto font-extralight text-slate-300 scrollbar-hide sm:max-h-[280px]	">
                  {place.description}
                </p>
                <Link href={`/place/${place.id}`}>
                  <div className="flex items-center justify-center rounded bg-[var(--c-highlights)] px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600">
                    Go to place
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
