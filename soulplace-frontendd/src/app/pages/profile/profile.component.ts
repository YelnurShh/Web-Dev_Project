import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';
  favoritesCount = 0;
  reviewsCount = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/api/profile/').subscribe({
      next: (data) => {
        this.username = data.username;
        this.email = data.email;
        this.favoritesCount = data.favorites_count;
        this.reviewsCount = data.reviews_count;
      },
      error: () => this.router.navigate(['/login'])
    });
  }

  logout(): void {
    const refresh = localStorage.getItem('refresh') || '';
    this.http.post('http://localhost:8000/api/logout/', { refresh }).subscribe({
      complete: () => { localStorage.clear(); this.router.navigate(['/login']); },
      error: () => { localStorage.clear(); this.router.navigate(['/login']); }
    });
  }
}