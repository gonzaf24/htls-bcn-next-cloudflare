import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isLocationInBarcelona = (
  latA: number,
  lngA: number,
  bounds: { north: number; south: number; east: number; west: number },
) => {
  const withinLatBounds = latA >= bounds.south && latA <= bounds.north;
  const withinLngBounds = lngA >= bounds.west && lngA <= bounds.east;
  return withinLatBounds && withinLngBounds;
};

export const generateBorderColors = (colores: string[], borderWidth = '2px') => {
  const borderStyle: any = { borderWidth: borderWidth, borderStyle: 'solid' };
  switch (colores.length) {
    case 1:
      borderStyle.borderColor = colores[0];
      break;
    case 2:
      borderStyle.borderTopColor = colores[0];
      borderStyle.borderBottomColor = colores[0];
      borderStyle.borderRightColor = colores[1];
      borderStyle.borderLeftColor = colores[1];
      break;
    case 3:
      borderStyle.borderTopColor = colores[0];
      borderStyle.borderRightColor = colores[1];
      borderStyle.borderBottomColor = colores[2];
      borderStyle.borderLeftColor = colores[1];
      break;
    default:
      borderStyle.borderTopColor = colores[0];
      borderStyle.borderRightColor = colores[1];
      borderStyle.borderBottomColor = colores[2];
      borderStyle.borderLeftColor = colores[3];
      break;
  }
  return borderStyle;
};

// Convert a string to a URL-friendly slug
export const convertToUrlFriendly = (name: string) => {
  // Reemplaza los espacios por guiones y convierte todo a minúsculas
  let urlFriendlyName = name.replace(/\s+/g, '-').toLowerCase();
  // Reemplaza los caracteres "&" por "and"
  urlFriendlyName = urlFriendlyName.replace(/&/g, 'and');
  return urlFriendlyName;
};
