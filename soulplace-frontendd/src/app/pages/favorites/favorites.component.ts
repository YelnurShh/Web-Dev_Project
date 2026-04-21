import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Favorite } from '../../interfaces/models';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];
  error = '';

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.loadFavorites(); }

  loadFavorites(): void {
    this.api.getFavorites().subscribe({
      next: (data) => this.favorites = data,
      error: () => this.error = 'Failed to load favorites. Please login.'
    });
  }

  removeFavorite(id: number): void {
    this.api.deleteFavorite(id).subscribe({
      next: () => this.favorites = this.favorites.filter(f => f.id !== id),
      error: () => this.error = 'Failed to remove favorite'
    });
  }
}
