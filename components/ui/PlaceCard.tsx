import { Place } from '@/lib/definitions';

export const PlaceCard = ({ place }: { place: Place }) => {
  return (
    <div>
      <h2>{place.name}</h2>
      <p>{place.description}</p>
    </div>
  );
};
