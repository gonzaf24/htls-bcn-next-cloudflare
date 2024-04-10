import React from 'react';
import { MarkerF, CircleF } from '@react-google-maps/api';
import { MarkerCircleProps } from '@/lib/definitions';

export const CurrentPositionMarker: React.FC<MarkerCircleProps> = ({ location }) => {
  const { lat, lng } = location;
  return (
    <>
      <MarkerF
        position={{ lat: lat, lng: lng }}
        icon={{
          url: '/CloseIcon.svg',
          scaledSize: new google.maps.Size(10, 10),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(5, 5),
        }}
      />
      {[25, 60].map((radius, idx) => (
        <CircleF
          key={idx}
          center={{ lat: lat, lng: lng }}
          radius={radius}
          options={{
            fillColor: radius > 50 ? 'red' : 'green',
            strokeOpacity: 0.8,
          }}
        />
      ))}
    </>
  );
};
