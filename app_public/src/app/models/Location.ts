import { Review } from './Review';
import { OpeningTimes } from './OpeningTimes';

export interface Location {
  id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
  coords: {
    coordinates: number[],
  };
  openingTimes: OpeningTimes[];
  reviews: Review[];
}
