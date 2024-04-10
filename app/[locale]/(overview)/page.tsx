import Map from '@/components/map/Map';
import initTranslations from '@/app/[locale]/i18n';
import { Place } from '@/lib/interfaces';
import { AppConfig } from '@/config/appConfig';
import { fetchCategories, fetchPlace, fetchPlaces, fetchSubcategories } from '@/lib/data';
import { Category, Subcategory } from '@/lib/definitions';

export default async function Page({ params, searchParams }: any) {
  const { t } = await initTranslations(params.locale, AppConfig.i18nNamespaces);
  // Obtener datos de todos los lugares
  const places = await fetchPlaces(params.locale);
  // Obtener datos del lugar seleccionado
  const place = await fetchPlace(parseInt(searchParams.id), params.locale);
  // Obtener datos de todas las categorías
  const categories = await fetchCategories();
  // Mapear las subcategorías por categoría
  const categorySubcategoriesMap: { [key: number]: Subcategory[] } = {};
  // Obtener las subcategorías de cada categoría
  await Promise.all(
    categories.map(async (category) => {
      const subcategories = await fetchSubcategories(category.id);
      categorySubcategoriesMap[category.id] = subcategories || [];
    }),
  );

  return (
    <main>
      <Map
        place={place as Place}
        places={places as Place[]}
        categories={categories as Category[]}
        categorySubcategoriesMap={categorySubcategoriesMap as { [key: number]: Subcategory[] }}
      />
    </main>
  );
}
