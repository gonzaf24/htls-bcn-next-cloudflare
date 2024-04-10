import Breadcrumb from '@/components/ui/Breadcrumb';
import CategoryCard from '@/components/ui/CategoryCard';
import initTranslations from '@/app/[locale]/i18n';
import { notFound } from 'next/navigation';
import { AppConfig } from '@/config/appConfig';
import { fetchSubcategories } from '@/lib/actions';
export const runtime = 'edge';

const APP_ROUTES_VALUES = Object.values(AppConfig.APP_ROUTES);

export default async function CategoryPage({ params }: { params: { locale: string; category: string } }) {
  const locale = params.locale;
  const { t } = await initTranslations(locale, AppConfig.i18nNamespaces);
  const category = params.category;

  // Si la categoría no se encuentra en la lista de rutas, mostrar página no encontrada 404 not found.
  if (!AppConfig.APP_ROUTES_NAMES[category as keyof typeof AppConfig.APP_ROUTES_NAMES]) {
    notFound();
  }

  // Obterner el id de la categoría
  const categoryId = AppConfig.APP_ROUTES_IDS[category as keyof typeof AppConfig.APP_ROUTES_IDS];

  const _category = APP_ROUTES_VALUES[categoryId];

  const catParam = {
    name: _category.title,
    icon: _category.icon,
  };
  // Continuar con  la lógica si la categoría es válida
  const subcategories = await fetchSubcategories(categoryId);

  return (
    <main className="flex w-full flex-col items-start justify-start p-4">
      <Breadcrumb category={catParam} />
      <ul className="mt-6 flex flex-wrap ">
        {subcategories.map((subcategory) => (
          <CategoryCard key={subcategory.id} categoryId={categoryId} subcategory={subcategory} />
        ))}
      </ul>
    </main>
  );
}
