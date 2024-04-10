import { Place } from '@/lib/interfaces';

// Función para mapear los datos de un lugar a un objeto Place
export const mapPlaceDataToPlace = (placeData: any): Place => ({
  id: placeData.id,
  categories: placeData.categories,
  subcategories: placeData.subcategories,
  name: placeData.name,
  photos: placeData.photos,
  lat: placeData.lat,
  lng: placeData.lng,
  description: placeData.description,
  categoryIcon: placeData.category_icon,
  subcategoryIcon: placeData.subcategory_icon,
  categoryName: placeData.category_name,
  subcategoryName: placeData.subcategory_name,
  address: placeData.address,
  phones: placeData.phones,
  bookings: placeData.bookings,
  city: placeData.city,
  instagram: placeData.instagram,
  avgPrice: placeData.avg_price,
  googleMapLink: placeData.google_map_link,
  officialUrl: placeData.official_url,
  active: placeData.active,
  lastUpdate: placeData.last_update,
});
