/* eslint-disable @next/next/no-img-element */

import Breadcrumb from '@/components/ui/Breadcrumb';
import Carousel from '@/components/ui/Carousel';
import { ImageLogo } from '@/components/ui/ImageLogo';
import { fetchPlace } from '@/lib/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PlaceIDPage({ params }: { params: { locale: string; id: string } }) {
  const id = params.id;
  const locale = params.locale;
  const placeId = id?.toString().split('-').pop() || '';

  const place = await fetchPlace(parseInt(placeId), locale);

  if (!place) {
    notFound();
  }

  const catParam = {
    name: place.categoryName,
    icon: `/${place.categoryIcon}`,
  };

  const subcatParam = {
    id: place.subcategories[0],
    name: place.subcategoryName,
    icon: place.subcategoryIcon,
  };

  return (
    <main className="flex w-full flex-col items-start justify-start p-4">
      <Breadcrumb category={catParam} subcategory={subcatParam} placeName={place.name} />
      {place && (
        <ul className="mt-6 flex flex-col flex-wrap p-4">
          <div className="mb-4 mt-6 flex items-center gap-2 ">
            <ImageLogo
              isCategory={true}
              categoryId={place.categories[0]}
              src={place.categoryIcon}
              alt="Category icon"
            />
            <ImageLogo
              isCategory={false}
              categoryId={place.categories[0]}
              src={place.subcategoryIcon}
              alt="Subcategory icon"
            />
            <h1 className="xl:text-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-4xl">
              {place?.name}
            </h1>
          </div>
          <div className="mb-6">
            <ul className="flex max-w-[600px] flex-wrap gap-2">
              <Carousel photos={place?.photos ?? []} />
            </ul>
          </div>
          <div className="flex w-full flex-col">
            <p className="text-gray-500">{place?.description}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Ubicación</h2>
            <p className="text-gray-500">{place?.address}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Teléfono</h2>
            <p className="text-gray-500">{place?.phones?.[0]}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Reservas</h2>
            <p className="text-gray-500">{place?.bookings?.[0]}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold"> Precio promedio </h2>
            <p className="text-gray-500">{place?.avgPrice}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Sitio web oficial</h2>
            <p className="text-gray-500">{place?.officialUrl}</p>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Instagram</h2>
            <a
              href={place?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {place?.instagram}
            </a>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Ver en googlemaps</h2>
            <a
              href={place?.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {place?.googleMapLink}
            </a>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Ver en el mapa de highlights</h2>
            <Link href={`/?id=${place?.id}`}>
              <p className="text-blue-500 hover:underline">{place?.name}</p>
            </Link>

            <h2 className="mb-2 mt-4 text-xl font-semibold">Última actualización</h2>
            <p className="text-gray-500">{place?.lastUpdate?.toString()}</p>
          </div>
        </ul>
      )}
    </main>
  );
}
