import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav style="background: #2c3e50; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center;">
      <div style="color: white; font-size: 24px; font-weight: bold;">SoulPlace 💖</div>
      <div style="display: flex; gap: 20px; align-items: center;">
        <a routerLink="/places" style="color: white; text-decoration: none; font-size: 16px;">📍 Орындар</a>
        <a routerLink="/preferences" style="color: white; text-decoration: none; font-size: 16px;">🎯 Қалаулар</a>
        <a *ngIf="!isLoggedIn()" routerLink="/login" style="color: white; text-decoration: none; font-size: 16px;">🔑 Кіру</a>
        <button *ngIf="isLoggedIn()" (click)="logout()" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 16px;">
          🚪 Шығу
        </button>
      </div>
    </nav>
    <div style="padding: 20px; font-family: sans-serif; background-color: #f9f9f9; min-height: 100vh;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(private router: Router) {}

  // Токеннің бар-жоғын тексереді
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Жүйеден шығу логикасы
  logout() {
    localStorage.removeItem('auth_token'); // Токенді өшіреміз
    alert('Жүйеден сәтті шықтыңыз!');
    this.router.navigate(['/login']); // Логин бетіне лақтырамыз
  }
}