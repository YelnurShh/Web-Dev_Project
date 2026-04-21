import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Place, Review } from '../../interfaces/models';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.css'
})
export class PlaceDetailComponent implements OnInit {
  place: Place | null = null;
  reviews: Review[] = [];
  error = '';
  reviewText = '';
  reviewRating = 5;

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService, 
    private router: Router
  ) {}

  get isLoggedIn(): boolean { 
    return !!localStorage.getItem('access'); 
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getPlace(id).subscribe({ 
      next: (d) => this.place = d, 
      error: () => this.error = 'Place not found' 
    });
    this.api.getReviews(id).subscribe({ 
      next: (d) => this.reviews = d 
    });
  }

  addToFavorites(): void {
    if (!this.place) return;
    this.api.addFavorite(this.place.id).subscribe({
      next: () => alert('Added to favorites!'),
      error: () => alert('Already in favorites or login required')
    });
  }

  submitReview(): void {
    if (!this.place || !this.reviewText.trim()) return;
    
    const newReview = {
      place: this.place.id,
      rating: this.reviewRating,
      text: this.reviewText
    };

    this.api.addReview(this.place.id, newReview).subscribe({
      next: (r) => { 
        this.reviews.push(r); 
        this.reviewText = ''; 
        this.reviewRating = 5; 
      },
      error: () => this.error = 'Failed to submit review'
    });
  }

  // МІНДЕТТІ: HTML-дегі батырма үшін осы функция керек
  goBack(): void { 
    this.router.navigate(['/places']); 
  }
} // Осы соңғы жақша міндетті түрде болуы керек!