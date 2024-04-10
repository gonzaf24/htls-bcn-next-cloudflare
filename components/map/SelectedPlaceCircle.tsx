import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { MarkerCircleProps } from '@/lib/definitions';

export const SelectedPlaceCircle: React.FC<MarkerCircleProps> = ({ location }) => {
  const { lat, lng } = location;
  return (
    <>
      <MarkerF
        position={{ lat: lat, lng: lng }}
        zIndex={0}
        icon={{
          url: '/WhiteCircle.svg',
          scaledSize: new google.maps.Size(60, 60),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(30, 30),
        }}
      />
    </>
  );
};
