import { sql } from '@vercel/postgres';
import { Category, Subcategory } from '@/lib/definitions';
import { Place, UserData } from '@/lib/interfaces';
import { mapPlaceDataToPlace } from '@/lib/mapping-data';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchUser(email: string | undefined) {
  try {
    if (!email) {
      return null;
    }
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as UserData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const fetchCategories = async () => {
  const data = await sql`SELECT * FROM categories`;
  return data.rows as Category[];
};

export const fetchSubcategories = async (categoryId: number) => {
  const data = await sql`SELECT * FROM subcategories WHERE category_id = ${categoryId}`;
  return data.rows as Subcategory[];
};

export const fetchPlace = async (id: number, language: string) => {
  noStore();
  if (isNaN(id)) return null;
  let query;
  if (language === 'es') {
    query = sql`
      SELECT 
        p.id,
        p.categories,
        p.subcategories,
        p.name,
        p.photos,
        p.lat,
        p.lng,
        p.description_es as description,
        c.icon as category_icon,
        s.icon as subcategory_icon,
        c.t_name as category_name,
        s.t_name as subcategory_name
      FROM 
        places p
      LEFT JOIN 
        categories c ON c.id = ANY(p.categories)
      LEFT JOIN 
        subcategories s ON s.id = ANY(p.subcategories)
      WHERE
        p.id = ${id}
    `;
  } else if (language === 'en') {
    query = sql`
      SELECT 
        p.id,
        p.categories,
        p.subcategories,
        p.name,
        p.photos,
        p.lat,
        p.lng,
        p.description_en as description,
        c.icon as category_icon,
        s.icon as subcategory_icon,
        c.t_name as category_name,
        s.t_name as subcategory_name
      FROM 
        places p
      LEFT JOIN 
        categories c ON c.id = ANY(p.categories)
      LEFT JOIN 
        subcategories s ON s.id = ANY(p.subcategories)
      WHERE
        p.id = ${id}
    `;
  } else {
    throw new Error('Unsupported language');
  }
  const data = await query;
  // Mapear datos del lugar específico a objeto Place
  const place: Place | null = data.rows[0] ? mapPlaceDataToPlace(data.rows[0]) : null;

  return place; // Devuelve solo el primer lugar encontrado
};

export const fetchPlaces = async (language: string) => {
  let query;
  if (language === 'es') {
    query = sql`
      SELECT 
        p.id,
        p.categories,
        p.subcategories,
        p.name,
        p.photos,
        p.lat,
        p.lng,
        p.description_es as description,
        c.icon as category_icon,
        s.icon as subcategory_icon,
        c.t_name as category_name,
        s.t_name as subcategory_name
      FROM 
        places p
      LEFT JOIN 
        categories c ON c.id = ANY(p.categories)
      LEFT JOIN 
        subcategories s ON s.id = ANY(p.subcategories)
    `;
  } else if (language === 'en') {
    query = sql`
      SELECT 
        p.id,
        p.categories,
        p.subcategories,
        p.name,
        p.photos,
        p.lat,
        p.lng,
        p.description_en as description,
        c.icon as category_icon,
        s.icon as subcategory_icon,
        c.t_name as category_name,
        s.t_name as subcategory_name
      FROM 
        places p
      LEFT JOIN 
        categories c ON c.id = ANY(p.categories)
      LEFT JOIN 
        subcategories s ON s.id = ANY(p.subcategories)
    `;
  } else {
    throw new Error('Unsupported language');
  }
  const data = await query;
  // Mapear datos de todos los lugares a objetos Place
  const places: Place[] = data.rows.map((placeData: any) => mapPlaceDataToPlace(placeData));

  return places;
};
