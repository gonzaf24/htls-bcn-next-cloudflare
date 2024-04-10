import { AppConfig } from './appConfig';

const COLOR = {
  map: 'var(--c-highlights)',
  food: 'var(--c-food)',
  bar: 'var(--c-bar)',
  entertainment: 'var(--c-entertainment)',
  bookmarks: 'var(--c-bookmarks)',
};

const CATEGORIES_COLORS: { [key: number]: string } = {
  [AppConfig.CATEGORIES.food.id]: COLOR.food,
  [AppConfig.CATEGORIES.bar.id]: COLOR.bar,
  [AppConfig.CATEGORIES.entertainment.id]: COLOR.entertainment,
};

const ROUTE_NAME_COLOR: { [key: string]: string } = {
  [AppConfig.PATH.home]: COLOR.map,
  [AppConfig.PATH.food]: COLOR.food,
  [AppConfig.PATH.comida]: COLOR.food,
  [AppConfig.PATH.bar]: COLOR.bar,
  [AppConfig.PATH.entertainment]: COLOR.entertainment,
  [AppConfig.PATH.entretenimiento]: COLOR.entertainment,
};

const APP_THEMES = {
  light: 'light',
  dark: 'dark',
};

const ICON_MODAL_BACKGROUND: { [key: number]: string } = {
  [AppConfig.CATEGORIES.food.id]: 'bg-[#ffdabd]',
  [AppConfig.CATEGORIES.bar.id]: 'bg-[#ffc8c3]',
  [AppConfig.CATEGORIES.entertainment.id]: 'bg-[#c5b8cd]',
};

const ROUTE_COLOR: { [key: string]: string } = {
  [AppConfig.PATH.home]: COLOR.map,
  [AppConfig.PATH.food]: COLOR.food,
  [AppConfig.PATH.comida]: COLOR.food,
  [AppConfig.PATH.bar]: COLOR.bar,
  [AppConfig.PATH.entertainment]: COLOR.entertainment,
  [AppConfig.PATH.entretenimiento]: COLOR.entertainment,
};

export const StylesConfig = {
  CATEGORIES_COLORS,
  ROUTE_NAME_COLOR,
  APP_THEMES,
  ICON_MODAL_BACKGROUND,
  ROUTE_COLOR,
};
