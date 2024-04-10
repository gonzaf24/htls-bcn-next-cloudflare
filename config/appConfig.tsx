const i18nNamespaces = ['home'];
const CATEGORIES_PATH = '/categories';
const SUBCATEGORIES_PATH = '/subcategories';
const COOKIE_USER_KEY_NAME = 'htsl-u-d';

const PATH = {
  home: '/',
  food: '/food',
  comida: '/comida',
  bar: '/bar',
  entertainment: '/entertainment',
  entretenimiento: '/entretenimiento',
  bookmarks: '/bookmarks',
  favoritos: '/favoritos',
  categories: '/categories',
  subcategories: '/subcategories',
};

const NAME = {
  home: 'map',
  food: 'food',
  comida: 'comida',
  bar: 'bar',
  entertainment: 'entertainment',
  entretenimiento: 'entretenimiento',
  bookmarks: 'bookmarks',
  favoritos: 'favoritos',
};

const APP_ROUTES = {
  home: {
    path: PATH.home,
    title: 'map-title',
    name: 'Map',
    color: 'c_highlights',
    icon: '/map.svg',
  },
  food: {
    path: PATH.food,
    title: 'food-title',
    name: 'Food',
    color: 'c_food',
    icon: '/food.svg',
  },
  bar: {
    path: PATH.bar,
    title: 'bar-title',
    name: 'Bar',
    color: 'c_bar',
    icon: '/bar.svg',
  },
  entertainment: {
    path: PATH.entertainment,
    title: 'entertainment-title',
    name: 'Entertainment',
    color: 'c_entertainment',
    icon: '/entertainment.svg',
  },
};

const CATEGORIES = {
  food: {
    id: 1,
    name: APP_ROUTES.food.name,
    path: APP_ROUTES.food.path,
    t_name: APP_ROUTES.food.title,
  },
  bar: {
    id: 2,
    name: APP_ROUTES.bar.name,
    path: APP_ROUTES.bar.path,
    t_name: APP_ROUTES.bar.title,
  },
  entertainment: {
    id: 3,
    name: APP_ROUTES.entertainment.name,
    path: APP_ROUTES.entertainment.path,
    t_name: APP_ROUTES.entertainment.title,
  },
};

const APP_ROUTES_NAMES = {
  [NAME.home]: '',
  [NAME.food]: APP_ROUTES.food.title,
  [NAME.comida]: APP_ROUTES.food.title,
  [NAME.bar]: APP_ROUTES.bar.title,
  [NAME.entertainment]: APP_ROUTES.entertainment.title,
  [NAME.entretenimiento]: APP_ROUTES.entertainment.title,
};

const APP_ROUTES_IDS = {
  [NAME.food]: CATEGORIES.food.id,
  [NAME.comida]: CATEGORIES.food.id,
  [NAME.bar]: CATEGORIES.bar.id,
  [NAME.entertainment]: CATEGORIES.entertainment.id,
  [NAME.entretenimiento]: CATEGORIES.entertainment.id,
};

const LANGUAGES = {
  en: 'en',
  es: 'es',
};

const LANGUAGE_OPTIONS = [
  { value: LANGUAGES.en, label: 'En', avatar: 'https://flagcdn.com/gb.svg' },
  { value: LANGUAGES.es, label: 'Es', avatar: 'https://flagcdn.com/es.svg' },
];

const BOOKMARKS = {
  id: 4,
  name: NAME.bookmarks,
  t_name: 'bookmarks-title',
  path: PATH.bookmarks,
  icon: '/bookmarks.svg',
};

export const AppConfig = {
  i18nNamespaces,
  APP_ROUTES,
  APP_ROUTES_IDS,
  APP_ROUTES_NAMES,
  BOOKMARKS,
  CATEGORIES,
  CATEGORIES_PATH,
  COOKIE_USER_KEY_NAME,
  LANGUAGE_OPTIONS,
  LANGUAGES,
  PATH,
  SUBCATEGORIES_PATH,
};
