export class Location {
  id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
  reviews: Review[];
}

export class Review {
  author: string;
  rating: number;
  reviewText: string;
  createdOn: string;
}
