// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

import { ReactNode } from 'react';

export type NavigatorProps = {
  isMobile: boolean;
  onCloseMenu: () => void;
};

export type UseNavigatorStyles = {
  getActiveUnderlineColor: (menuItemPath: string) => string;
  getMobileActiveStyle: (menuItemPath: string) => { color: string };
  getUnderLineStyles: (menuItemPath: string) => {
    content?: string;
    bottom?: string;
    left?: string;
    right?: string;
    height?: string;
    backgroundColor?: string;
    opacity?: string;
    transition?: string;
    borderRadius?: string;
  };
  cleanPath: string;
};

export type DrawerProps = {
  isOpen: boolean;
  setIsPlaceDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  place: Place | null;
  onClose: () => void;
};

export type FiltersManagerProps = {
  categories: Category[];
  categorySubcategoriesMap: { [key: number]: Subcategory[] };
  places: Place[];
  setFilteredPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  bookmarks: Place[];
};

export type Category = {
  id: number;
  name: string;
  t_name: string;
  icon: string;
};

export type Subcategory = {
  id: number;
  category_id: number;
  name: string;
  t_name: string;
  icon: string;
};

export type FoodFiltersProps = {
  category: Category;
  subcategories: Subcategory[];
  onFilterChange: (categoryId: number, subcategoryId: number, isChecked: boolean) => void;
  selectedSubcategoryIds: number[];
};

export type ProviderProps = {
  children: ReactNode;
  locale: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Place = {
  id: number;
  categories: number[];
  subcategories: number[];
  name: string;
  photos: string[];
  lat: number;
  lng: number;
  description: string;
  categoryIcon: string;
  subcategoryIcon: string;
  categoryName: string;
  subcategoryName: string;
  address?: string;
  phones?: string[];
  bookings?: string[];
  city?: string;
  instagram?: string;
  avgPrice?: string;
  googleMapLink?: string;
  officialUrl?: string;
  active?: boolean;
  lastUpdate?: string; // Puede que necesites ajustar el tipo de este campo dependiendo del formato de fecha que uses en tu base de datos
  date?: string; // Puede que necesites ajustar el tipo de este campo dependiendo del formato de fecha que uses en tu base de datos
};

export type BookmarksContextType = {
  bookmarks: Place[];
  updateBookmark: (placeId: number, isBookmarked: boolean) => Promise<boolean>;
  isLoading: boolean;
};

export type UserContextType = {
  isAuthenticated: boolean;
  user: UserData | null;
  login: () => void;
  logout: () => void;
};

export type LocationProps = {
  lat: number;
  lng: number;
};

export type MarkerCircleProps = {
  location: LocationProps;
};

export type SubcategoryNameProps = {
  categoryId: number;
  subcategoryName: string;
  className?: string;
};

export type ImageLogoProps = {
  categoryId: number;
  src: string;
  alt: string;
  className?: string;
};

export type HtslLogoProps = {
  handleClick?: () => void;
};

export type CarouselProps = {
  photos: string[];
};

export type MapFiltersProps = {
  selectedFiltersCategories: number[];
  onFilterChange: (categoryId: number) => void;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};
