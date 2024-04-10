export type RegisterUser = {
  name: string;
  email: string;
  image: string;
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
