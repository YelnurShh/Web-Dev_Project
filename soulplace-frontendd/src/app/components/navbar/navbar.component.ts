import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private api: ApiService, private router: Router) {}

  get isLoggedIn(): boolean { return !!localStorage.getItem('access'); }

  get username(): string { return localStorage.getItem('username') || 'U'; }

  get initial(): string { return this.username[0]?.toUpperCase() || 'U'; }

  logout(): void {
    const refresh = localStorage.getItem('refresh') || '';
    this.api.logout(refresh).subscribe({
      complete: () => { localStorage.clear(); this.router.navigate(['/login']); },
      error: () => { localStorage.clear(); this.router.navigate(['/login']); }
    });
  }
}