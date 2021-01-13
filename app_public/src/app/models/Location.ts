import { Review } from './Review';

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
  openingTimes: [
    {
      id: string;
      closed: boolean;
      closing: string;
      days: string;
      opening: string;
    }
  ];
  reviews: Review[];
}
