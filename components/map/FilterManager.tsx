import React, { useState, useEffect, cloneElement } from 'react';
import { AppConfig } from '@/config/appConfig';
import { MapConfig } from '@/config/mapConfig';
import { useUserContext } from '@/app/context/userContext';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox } from '@nextui-org/react';
import { FiltersManagerProps } from '@/lib/definitions';
import { FilterDropdown, categoryColorClasses } from '@/components/map/FilterDropdown';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';

// FiltersManager component handles filtering functionality for places
export const FiltersManager: React.FC<FiltersManagerProps> = ({
  categories,
  categorySubcategoriesMap,
  places,
  setFilteredPlaces,
  bookmarks,
}) => {
  // Translation hook for localization
  const { t } = useTranslation();
  // State to track whether bookmarks should be shown or not
  const [showBookmarks, setShowBookmarks] = useState(false);
  // Context hook to check user authentication status
  const { isAuthenticated } = useUserContext();
  // State to manage selected subcategory IDs for filtering
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);

  // Effect to reset showBookmarks state when selectedSubcategoryIds change
  useEffect(() => {
    setShowBookmarks(false);
  }, [selectedSubcategoryIds]);

  // Effect to update selectedSubcategoryIds when categorySubcategoriesMap changes
  useEffect(() => {
    const allSubcategoryIds = Object.values(categorySubcategoriesMap)
      .flat()
      .map((subcategory) => subcategory.id);
    setSelectedSubcategoryIds(allSubcategoryIds);
  }, [categorySubcategoriesMap]);

  // Function to handle filter changes
  const handleFilterChange = (subcategoryId: number, isChecked: boolean) => {
    setSelectedSubcategoryIds((prevIds) =>
      isChecked ? [...prevIds, subcategoryId] : prevIds.filter((id) => id !== subcategoryId),
    );
  };

  // Effect to update filtered places based on filters and bookmarks
  // Function to handle changes in bookmarks visibility
  const handleBookmarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBookmarks(event.target.checked);
  };

  useEffect(() => {
    const filtered = !showBookmarks
      ? places.filter((place) => selectedSubcategoryIds.some((id) => place.subcategories.includes(id)))
      : bookmarks;
    setFilteredPlaces(filtered);
  }, [places, selectedSubcategoryIds, setFilteredPlaces, showBookmarks, bookmarks]);

  // Function to get category class name
  const getCategoryColorClassName = (categoryId: number) => categoryColorClasses[categoryId] || '';

  // Function to get icon for category
  const getIconForCategory = (categoryId: number) => {
    const iconWithColor = MapConfig.ICONS_MAP[categoryId];
    return iconWithColor ? cloneElement(iconWithColor.icon) : null;
  };

  // JSX structure for FiltersManager component
  return (
    <div className="flex items-center justify-center">
      <ul className="light:border-c_black_20 m-3 flex flex-wrap items-center justify-start rounded-lg border-1 dark:border-c_gray_20 sm:flex-nowrap sm:gap-10 sm:px-10">
        {/* Iterate over categorySubcategoriesMap to render FilterDropdown components */}
        {Object.keys(categorySubcategoriesMap).map((categoryId) => {
          const subcategories = categorySubcategoriesMap[Number(categoryId)];
          const category = categories.find((cat) => cat.id === Number(categoryId));
          if (!category) return null;
          return (
            <FilterDropdown
              key={categoryId}
              category={category}
              subcategories={subcategories}
              onFilterChange={(categoryId, subcategoryId, isChecked) =>
                handleFilterChange(subcategoryId, isChecked)
              }
              selectedSubcategoryIds={selectedSubcategoryIds}
            />
          );
        })}
        {/* Render button with checkbox for bookmarks */}
        <li className="flex items-center justify-start gap-2 p-2 sm:w-full">
          {isAuthenticated ? (
            <Button className="align-center flex flex h-[34px] items-center justify-center justify-center bg-[var(--c-highlights)] hover:bg-c_highlights_hover sm:h-[40px]">
              <Checkbox
                className={`${getCategoryColorClassName(AppConfig.BOOKMARKS.id)} hover:none p-0`}
                isSelected={showBookmarks}
                onChange={handleBookmarksChange}
                icon={getIconForCategory(AppConfig.BOOKMARKS.id)}
              >
                <p className="text-[14px] sm:text-[1rem]">{t('bookmarks-title')}</p>
              </Checkbox>
            </Button>
          ) : (
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <div className="flex items-center justify-start gap-2">
                  <button className="flex h-[34px] transform items-center justify-center rounded-xl bg-[var(--c-highlights)] p-3 ease-in-out hover:opacity-75 sm:h-[40px]">
                    <div className="flex gap-1">
                      <p className="text-[14px] sm:text-[1rem]">{t('bookmarks-title')}</p>
                    </div>
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="border-1 p-0 p-2 dark:border-c_gray_20">
                <div className="px-1 py-2 ">
                  <div className="text-small font-bold">{t('login_text_popover')}</div>
                  <div className="text-tiny">{t('its_free')}</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </li>
      </ul>
    </div>
  );
};

export default FiltersManager;
