'use server';

import { sql } from '@vercel/postgres';
import { mapPlaceDataToPlace } from '@/lib/mapping-data';
import { Category, Subcategory } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Place, RegisterUser, UserData } from '@/lib/interfaces';

export async function createUser(user: RegisterUser) {
  try {
    // "createUser" Se ejecuta una sola vez cuando el usuario inicia sesión.
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${user.email};
    `;

    // Si el usuario ya existe, retornar los datos del usuario existente
    if (existingUser.rowCount > 0) {
      return {
        success: true,
        message: 'User already exists.',
        user: existingUser.rows[0] as UserData, // Devolver los datos del usuario existente
      };
    }

    // Si el usuario no existe, insertarlo en la base de datos
    await sql`
      INSERT INTO users (name, email, image)
      VALUES (${user.name}, ${user.email}, ${user.image || null});
    `;

    // Buscar el usuario recién creado
    const newUser = await sql`
      SELECT * FROM users WHERE email = ${user.email};
    `;

    // Retornar los datos del usuario recién creado
    return {
      success: true,
      message: 'User created successfully.',
      user: newUser.rows[0] as UserData, // Devolver los datos del usuario recién creado
    };
  } catch (error) {
    // Retornar un mensaje de error si ocurre algún problema con la base de datos
    return {
      success: false,
      message: 'Database Error: Failed to create user.',
    };
  }
}

export async function fetchUser(email: string | undefined) {
  try {
    noStore();

    if (!email) {
      return null;
    }
    // Consulta SQL para buscar al usuario por su email
    const user = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    // Retornar los datos del usuario
    return user.rows[0] as UserData;
  } catch (error) {
    // Retornar un mensaje de error si ocurre algún problema con la base de datos
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function updateBookmarkStatus(
  placeId: number,
  userId: string | undefined,
  isBookmarked: boolean,
) {
  try {
    if (!userId) {
      return { success: false, message: 'User not found.' };
    }
    noStore();
    // Consulta SQL para insertar o actualizar el marcador
    await sql`
      INSERT INTO bookmarks (place_id, user_id, is_bookmarked)
      VALUES (${placeId}, ${userId}, ${isBookmarked})
      ON CONFLICT (place_id, user_id) DO UPDATE
      SET is_bookmarked = ${isBookmarked};
    `;

    return {
      success: true,
      message: `Bookmark status for place ${placeId} updated successfully.`,
      isBookmarked: isBookmarked,
    };
  } catch (error) {
    console.error('Error updating bookmark status:', error);
    return { success: false, message: 'Failed to update bookmark status.' };
  }
}

export async function isPlaceBookmarked(placeId: number, userId: string) {
  noStore();
  try {
    // Consulta SQL para obtener el estado de marcador de un lugar
    const response = await sql`
      SELECT is_bookmarked FROM bookmarks
      WHERE place_id = ${placeId} AND user_id = ${userId}
    `;
    // Retornar el estado de marcador del lugar
    return response.rows[0]?.is_bookmarked || false;
  } catch (error) {
    console.error('Error fetching bookmark status:', error);
    return false;
  }
}

export const fetchBookmarkedPlaces = async (userId: string | undefined, language: string) => {
  try {
    noStore();
    if (!userId) {
      return []; // Devuelve un array vacío si no hay un ID de usuario
    }
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
          p.id IN (
            SELECT place_id FROM bookmarks
            WHERE user_id = ${userId} AND is_bookmarked = true
          )
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
          p.id IN (
            SELECT place_id FROM bookmarks
            WHERE user_id = ${userId} AND is_bookmarked = true
          )
      `;
    } else {
      throw new Error('Unsupported language');
    }

    const data = await query;
    // Mapear datos de lugares marcados a objetos Place
    const places: Place[] = data.rows.map((row: any) => mapPlaceDataToPlace(row));

    return places;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

export const fetchPlace = async (id: number, language: string) => {
  noStore();
  if (!id) {
    return null; // Devuelve null si no hay un ID de lugar
  }

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
        p.trick_es as trick,
        p.schedules_es as schedules,
        p.address,
        p.phones,
        p.booking_es as bookings,
        p.city,
        p.instagram,
        p.avg_price,
        p.google_map_link,
        p.official_url,
        p.active,
        p.last_update,
        p.date,
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
        p.trick_en as trick,
        p.schedules_en as schedules,
        p.address,
        p.phones,
        p.booking_en as bookings,
        p.city,
        p.instagram,
        p.avg_price,
        p.google_map_link,
        p.official_url,
        p.active,
        p.last_update,
        p.date,
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

export const fetchPlacesBySubcategoryId = async (subcategoryId: number, language: string) => {
  noStore();
  let query;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

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
        p.trick_es as trick,
        p.schedules_es as schedules,
        p.address,
        p.phones,
        p.booking_es as bookings,
        p.city,
        p.instagram,
        p.avg_price,
        p.google_map_link,
        p.official_url,
        p.active,
        p.last_update,
        p.date,
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
        ${subcategoryId} = ANY(p.subcategories)
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
        p.trick_en as trick,
        p.schedules_en as schedules,
        p.address,
        p.phones,
        p.booking_en as bookings,
        p.city,
        p.instagram,
        p.avg_price,
        p.google_map_link,
        p.official_url,
        p.active,
        p.last_update,
        p.date,
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
        ${subcategoryId} = ANY(p.subcategories)
    `;
  } else {
    throw new Error('Unsupported language');
  }

  const data = await query;
  // Mapear datos de los lugares a objetos Place
  const places: Place[] = data.rows.map((row: any) => mapPlaceDataToPlace(row));

  return places;
};

export const fetchCategories = async () => {
  const data = await sql`SELECT * FROM categories`;
  return data.rows as Category[];
};

export const fetchSubcategories = async (categoryId: number) => {
  /*   const promise1 = await new Promise((resolve) => setTimeout(resolve,9000));
  const promise2 = await new Promise((resolve) => setTimeout(resolve,9000));
  const promise3 = await new Promise((resolve) => setTimeout(resolve,9000));

  await Promise.all([promise1, promise2, promise3]).then(() => {
    console.log('Todas las promesas se han resuelto después de 8 segundos');
  }); */
  const data = await sql`SELECT * FROM subcategories WHERE category_id = ${categoryId}`;
  return data.rows as Subcategory[];
};

export const fetchSubcategoryById = async (subcategoryId: number) => {
  noStore();
  const data = await sql`SELECT * FROM subcategories WHERE id = ${subcategoryId}`;
  return data.rows[0] as Subcategory;
};
