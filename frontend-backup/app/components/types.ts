// app/types.ts
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  distance: number;
  cuisine: string;
  dish: string;
  serves: number;
  bidders: number;
  currentBid: number;
  progress: number;
  tag?: string;
}