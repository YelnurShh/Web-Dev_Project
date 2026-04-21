import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Place } from '../../interfaces/models';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent {
  @Input() place!: Place;
  @Output() favoriteClicked = new EventEmitter<Place>();

  get isLoggedIn(): boolean { return !!localStorage.getItem('access'); }
  addToFavorites(): void { this.favoriteClicked.emit(this.place); }
}
