import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<any> { return this.http.get(`${this.baseUrl}/places/`); }
  login(userData: any): Observable<any> { return this.http.post(`${this.baseUrl}/auth/login/`, userData); }

  // 1. CREATE: Жаңа қалау жіберу
  postPreference(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/preferences/`, data);
  }

  // 2. READ: Менің сақтаған қалауларымды көру
  getPreferences(): Observable<any> {
    return this.http.get(`${this.baseUrl}/preferences/`);
  }

  // 3. DELETE: Қалауды өшіру (ID арқылы)
  deletePreference(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/preferences/${id}/`);
  }
}