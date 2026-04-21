import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, Favorite, AuthResponse, Review } from '../interfaces/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register/`, data);
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login/`, data);
  }

  logout(refresh: string): Observable<any> {
    return this.http.post(`${this.base}/logout/`, { refresh });
  }

  getPlaces(filters?: any): Observable<Place[]> {
    let params = new HttpParams();
    if (filters?.place_type) params = params.set('place_type', filters.place_type);
    if (filters?.budget) params = params.set('budget', filters.budget);
    if (filters?.mood) params = params.set('mood', filters.mood);
    if (filters?.location) params = params.set('location', filters.location);
    return this.http.get<Place[]>(`${this.base}/places/`, { params });
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.base}/places/${id}/`);
  }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.base}/favorites/`);
  }

  addFavorite(place_id: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.base}/favorites/`, { place_id });
  }

  deleteFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.base}/favorites/${id}/`);
  }

  getReviews(placeId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.base}/places/${placeId}/reviews/`);
  }

  addReview(placeId: number, data: any): Observable<Review> {
    return this.http.post<Review>(`${this.base}/places/${placeId}/reviews/`, data);
  }
}
