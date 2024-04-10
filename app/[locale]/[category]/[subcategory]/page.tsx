import { notFound } from 'next/navigation';
import { SubcategoryCard } from '@/components/ui/SubcategoryCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { AppConfig } from '@/config/appConfig';
import { fetchPlacesBySubcategoryId, fetchSubcategoryById } from '@/lib/actions';

const APP_ROUTES_VALUES = Object.values(AppConfig.APP_ROUTES);

export default async function SubcategoryPage({
  params,
}: {
  params: { locale: string; category: string; subcategory: string };
}) {
  const locale = params.locale;

  console.log(params);
  const subcategoryPath = params.subcategory;
  const category = params.category;

  const subcategoryId = parseInt(subcategoryPath?.toString().split('-').pop() || '');
  const places = await fetchPlacesBySubcategoryId(subcategoryId, locale);

  if (!places || places.length === 0) {
    notFound();
  }
  const categoryId = AppConfig.APP_ROUTES_IDS[category as keyof typeof AppConfig.APP_ROUTES_IDS];

  const _category = APP_ROUTES_VALUES[categoryId];

  const catParam = {
    name: _category.title,
    icon: _category.icon,
  };

  const _subcatResp = await fetchSubcategoryById(subcategoryId);

  const subcatParam = {
    id: subcategoryId,
    name: _subcatResp.t_name,
    icon: _subcatResp.icon,
  };

  return (
    <main className="flex w-full flex-col items-start justify-start p-4">
      <Breadcrumb category={catParam} subcategory={subcatParam} />
      <ul className="mt-6 flex flex-wrap ">
        {places.map((place) => (
          <SubcategoryCard key={place.id} place={place} />
        ))}
      </ul>
    </main>
  );
}
