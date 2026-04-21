import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Place } from '../../interfaces/models';
import { PlaceCardComponent } from '../../components/place-card/place-card.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [FormsModule, CommonModule, PlaceCardComponent],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  error = '';
  filters = { place_type: '', budget: '', mood: '', location: '' };

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.loadPlaces(); }

  loadPlaces(): void {
    this.api.getPlaces(this.filters).subscribe({
      next: (data) => this.places = data,
      error: () => this.error = 'Failed to load places'
    });
  }

  applyFilters(): void { this.loadPlaces(); }

  clearFilters(): void {
    this.filters = { place_type: '', budget: '', mood: '', location: '' };
    this.loadPlaces();
  }

  addToFavorites(place: Place): void {
    this.api.addFavorite(place.id).subscribe({
      next: () => alert(`${place.name} added to favorites!`),
      error: () => alert('Login required to save favorites')
    });
  }
}
