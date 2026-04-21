export interface Place {
  id: number;
  name: string;
  description: string;
  place_type: string;
  location: string;
  budget: string;
  mood: string;
  image_url: string;
}

export interface Favorite {
  id: number;
  place: Place;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface Review {
  id: number;
  user: string;
  place: number;
  rating: number;
  text: string;
  created_at: string;
}
