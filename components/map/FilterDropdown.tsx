/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { AppConfig } from '@/config/appConfig';
import { CaretUpIcon } from '../icons/CaretUpIcon';
import { StylesConfig } from '@/config/stylesConfig';
import { CaretDownIcon } from '../icons/CaretDownIcon';
import { useTranslation } from 'react-i18next';
import { FoodFiltersProps } from '@/lib/definitions';
import styles from './FilterDropdown.module.css';

export const categoryColorClasses: { [key: number]: string } = {
  [AppConfig.CATEGORIES.food.id]: styles.food,
  [AppConfig.CATEGORIES.bar.id]: styles.bar,
  [AppConfig.CATEGORIES.entertainment.id]: styles.entertainment,
  [AppConfig.BOOKMARKS.id]: styles.bookmarks,
};

export const FilterDropdown: React.FC<FoodFiltersProps> = ({
  category,
  subcategories,
  onFilterChange,
  selectedSubcategoryIds,
}) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown open/close

  const handleCheckboxChange = (subcategoryId: number, isChecked: boolean) => {
    onFilterChange(category.id, subcategoryId, isChecked);
  };

  if (!category || !subcategories) return null;

  const getCategoryClassName = (categoryId: number) => {
    return categoryColorClasses[categoryId] || '';
  };

  return (
    <li className="flex items-center justify-start gap-2 p-2 sm:w-full">
      <Dropdown closeOnSelect={false} isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownTrigger>
          <Button variant="flat" className="flex h-[34px] min-w-max items-center justify-center sm:h-[40px]">
            <div className="flex items-center justify-center gap-1">
              <img
                src={`${AppConfig.CATEGORIES_PATH}/${category.icon}`}
                alt="Category icon"
                className="h-4 w-4 sm:h-6 sm:w-6"
              />
              <p className="text-[14px] sm:text-[1rem]">{t(category.t_name)}</p>
              {!isDropdownOpen && (
                <CaretDownIcon color={StylesConfig.CATEGORIES_COLORS[category.id] || 'white'} />
              )}
              {isDropdownOpen && (
                <CaretUpIcon color={StylesConfig.CATEGORIES_COLORS[category.id] || 'white'} />
              )}
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {subcategories.map((subcategory) => (
            <DropdownItem key={subcategory.id}>
              <Checkbox
                onChange={(event) => handleCheckboxChange(subcategory.id, event.target.checked)}
                isSelected={selectedSubcategoryIds.includes(subcategory.id)}
                className={getCategoryClassName(category.id)}
              >
                <div className="flex gap-1">
                  <img
                    src={`${AppConfig.SUBCATEGORIES_PATH}/${subcategory.icon}`}
                    alt="Subcategory icon"
                    className="h-6 w-6"
                  />
                  <p>{t(subcategory.t_name)}</p>
                </div>
              </Checkbox>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </li>
  );
};
