/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useUrlParams from '@/app/hooks/useUrlParams';
import { Place } from '@/lib/interfaces';
import { Button } from '@nextui-org/react';
import { MapConfig } from '@/config/mapConfig';
import { AppConfig } from '@/config/appConfig';
import { useTranslation } from 'react-i18next';
import { MapPlaceDrawer } from '@/components/map/MapPlaceDrawer';
import { FiltersManager } from '@/components/map/FilterManager';
import { HomeMapSkeleton } from '@/components/ui/Skeletons';
import { SelectedPlaceCircle } from '@/components/map/SelectedPlaceCircle';
import { Category, Subcategory } from '@/lib/definitions';
import { CurrentPositionMarker } from '@/components/map/CurrentPositionMarker';
import { isLocationInBarcelona } from '@/lib/utils';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useBookmarkContext } from '@/app/context/bookmarksContext';

function Map({
  places,
  place,
  categories,
  categorySubcategoriesMap,
}: {
  places: Place[];
  place: Place;
  categories: Category[];
  categorySubcategoriesMap: { [key: number]: Subcategory[] };
}) {
  // Refs
  const mapRef = useRef({} as google.maps.Map);

  const { t } = useTranslation();
  // State
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [center, setCenter] = useState({
    lat: MapConfig.BCN_CENTER_COORDINATES.lat,
    lng: MapConfig.BCN_CENTER_COORDINATES.lng,
  });
  const [centerMeActive, setCenterMeActive] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedPlaceCircle, setSelectedPlaceCircle] = useState({
    lat: 0,
    lng: 0,
  });
  const [isPlaceDrawerOpen, setIsPlaceDrawerOpen] = useState(false);

  /*   // Referencia al DirectionsService
  const directionsService = useRef<google.maps.DirectionsService | null>(null);

  // Estado para mantener la referencia al DirectionsRenderer
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null); */

  // Custom hook to manage category filters and URL params
  const { bookmarks } = useBookmarkContext();
  const { setQueryParam, removeQueryParam } = useUrlParams();
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  // Side effect to reset selected place circle
  useEffect(() => {
     setSelectedPlaceCircle({ lat: 0, lng: 0 });
  }, [filteredPlaces]);

  // Side effect to set center of the map to the selected place if came from URL params
  useEffect(() => {
    if (place) {
      setCenter({ lat: place.lat, lng: place.lng });
      setSelectedPlace(place);
      setSelectedPlaceCircle({ lat: place.lat, lng: place.lng });
      if (mapRef?.current && Object.keys(mapRef.current).length > 0) {
        mapRef.current.setZoom(16);
      }
    }
  }, [place, mapRef?.current]);

  // Side effect to get the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setCenterMeActive(true);
      });
    } else {
      setCenterMeActive(false);
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // Check if current location is within Barcelona bounds
  const isInBarcelonaBounds = useMemo(
    () => isLocationInBarcelona(lat, lng, MapConfig.BARCELONA_BOUNDS),
    [lat, lng],
  );

  // Handler to center the map on current location
  const handleCenterMeClick = useCallback(() => {
    setCenterMeActive(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        mapRef.current?.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        mapRef.current?.setZoom(16);
        setCenterMeActive(true);
      });
    } else {
      setCenterMeActive(true);
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // Handler to set selected place on click
  const handlePlaceClick = useCallback((place: Place) => {
    setQueryParam('id', place.id.toString());
    setSelectedPlace(place);
    setSelectedPlaceCircle({ lat: place.lat, lng: place.lng });
    mapRef.current?.panTo({ lat: place.lat, lng: place.lng });
    const currentZoom = mapRef.current?.getZoom();
    if (currentZoom && currentZoom < 14) {
      mapRef.current?.setZoom(14);
    }
    setIsPlaceDrawerOpen(true);
  }, []);

  // Handler to close modal
  const handleCloseDrawer = useCallback(() => {
    removeQueryParam('id');
    //setSelectedPlace(null);
  }, []);

  // Handle map load
  const handleLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Función para limpiar la ruta anterior
  /* const clearPreviousRoute = () => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }
  }; */

  // Handler para calcular la ruta
  /* const handleCalculateRoute = () => {
    if (!directionsService.current || !mapRef.current) {
      return;
    }

    const origin = new google.maps.LatLng(Number(lat), Number(lng));
    const destination = new google.maps.LatLng(
      Number(selectedPlace?.lat ?? 0),
      Number(selectedPlace?.lng ?? 0),
    );

    directionsService.current.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && mapRef.current) {
          // Limpiar la ruta anterior si existe
          clearPreviousRoute();

          // Renderizar la nueva ruta
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(mapRef.current);
          directionsRenderer.setDirections(result);

          // Actualizar la referencia al DirectionsRenderer
          setDirectionsRenderer(directionsRenderer);
        } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
          console.warn(
            'No se encontraron resultados para la ruta especificada.',
          );
        } else {
          console.error('Error al calcular la ruta:', status);
        }
      },
    );
  }; */

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_HTLSBCN_MAP_API_KEY as string,
  });

  /*   // Load DirectionsService on load
  useEffect(() => {
    if (isLoaded) {
      directionsService.current = new google.maps.DirectionsService();
    }
  }, [isLoaded]); */

  // Show skeleton while loading
  if (!isLoaded) {
    return <HomeMapSkeleton />;
  }

  return (
    <div>
      {/* Place drawer */}
      <MapPlaceDrawer
        isOpen={isPlaceDrawerOpen}
        setIsPlaceDrawerOpen={setIsPlaceDrawerOpen}
        place={selectedPlace}
        onClose={handleCloseDrawer}
      />

      {/* Map filters */}
      <FiltersManager
        categories={categories as Category[]}
        categorySubcategoriesMap={categorySubcategoriesMap}
        places={places}
        setFilteredPlaces={setFilteredPlaces}
        bookmarks={bookmarks}
      />

      {/* Map container */}
      <div className="relative mx-auto flex h-max max-h-[800px] flex-col items-center justify-center">
        {/* Center on me button */}
        <Button
          disabled={!isInBarcelonaBounds || !centerMeActive}
          onClick={handleCenterMeClick}
          className="disabled:bg-gray rounded-ful absolute left-4 top-20 z-10 flex h-12 w-12 min-w-0 items-center justify-center rounded-full rounded-full bg-c_highlights p-4 text-[9px] text-white"
        >
          <p>
            center me <br /> {isInBarcelonaBounds && centerMeActive ? '✅' : '❌'}
          </p>
        </Button>

        {/* <Button
          className="disabled:bg-gray rounded-ful absolute left-4 top-40 z-10 flex h-12 w-12 min-w-0 items-center justify-center rounded-full rounded-full bg-c_highlights p-4 text-[9px] text-white"
          onClick={handleCalculateRoute}
        >
          Calcular ruta
        </Button> */}

        {/* Google Map */}
        <GoogleMap
          id="map"
          options={MapConfig.MAP_CONFIG_OPTIONS}
          zoom={14}
          center={center}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={MapConfig.MAP_STYLE}
          onLoad={handleLoad}
        >
          {/* Current position marker */}
          <CurrentPositionMarker location={{ lat, lng }} />

          {/* Selected place circle */}
          <SelectedPlaceCircle location={selectedPlaceCircle} />

          {/* Markers for filtered places */}
          {filteredPlaces.map((place: Place, index: number) => (
            <MarkerF
              key={index}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={() => handlePlaceClick(place)}
              zIndex={1}
              icon={{
                url: `${AppConfig.SUBCATEGORIES_PATH}/${place.subcategoryIcon}`,
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 20),
                labelOrigin: new google.maps.Point(20, 55),
              }}
              label={{
                text: place.name,
                color: 'black',
                fontWeight: 'bold',
                fontSize: '0.9em',
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
