import { AppConfig } from './appConfig';
import BarIcon from '@/components/icons/BarIcon';
import FoodIcon from '@/components/icons/FoodIcon';
import BookmarkIconAlt from '@/components/icons/BookmarksIcon';
import EntertainmentIcon from '@/components/icons/EntertainmentIcon';
import BookmarksIcon from '@/components/icons/BookmarksIcon';

const MAP_STYLE = {
  width: '100%',
  height: 'calc(100vh - 290px)',
  paddingTop: '56px',
};

const BARCELONA_BOUNDS = {
  north: 41.465, // Latitud máxima
  south: 41.307, // Latitud mínima
  east: 2.229, // Longitud máxima
  west: 2.034, // Longitud mínima
};

const ICONS_MAP: Record<number, { icon: JSX.Element }> = {
  1: { icon: <FoodIcon /> },
  2: { icon: <BarIcon /> },
  3: { icon: <EntertainmentIcon /> },
  4: { icon: <BookmarksIcon size={10} /> },
};

const customMapStyles = [
  {
    featureType: 'transit.station',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'geometry',
    stylers: [
      {
        color: 'white',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: 'white',
      },
    ],
  },
];

const MAP_CONFIG_OPTIONS = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: true,
  styles: customMapStyles,
  streetViewControl: true,
  scaleControl: false,
  fullscreenControl: false,
  zoomControl: false,
  maxZoom: 18,
  minZoom: 12,
};

const INITIAL_STATE_FILTERS = [
  AppConfig.CATEGORIES.food.id,
  AppConfig.CATEGORIES.bar.id,
  AppConfig.CATEGORIES.entertainment.id,
];

const BCN_CENTER_COORDINATES = {
  lat: 41.38879,
  lng: 2.15899,
};

export const MapConfig = {
  MAP_STYLE,
  BARCELONA_BOUNDS,
  ICONS_MAP,
  MAP_CONFIG_OPTIONS,
  INITIAL_STATE_FILTERS,
  BCN_CENTER_COORDINATES,
};
