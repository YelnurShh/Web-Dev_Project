import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef қостық
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h1 style="color: #2c3e50;">🚀 SoulPlace: Django + Angular Жұмыс істеп тұр!</h1>
      <hr>
      
      <div *ngIf="places && places.length > 0; else noData">
        <div *ngFor="let place of places" 
             style="background: white; border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="margin: 0; color: #3498db;">☕ {{ place.name }}</h2>
          <p style="color: #7f8c8d; margin: 10px 0;">{{ place.description }}</p>
          <div style="display: flex; gap: 15px;">
            <span style="background: #e1f5fe; color: #0288d1; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">✨ {{ place.vibe }}</span>
            <span style="background: #e8f5e9; color: #2e7d32; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">💰 {{ place.budget_level }}</span>
          </div>
        </div>
      </div>

      <ng-template #noData>
        <div style="padding: 20px; background: #fff3e0; color: #e65100; border-radius: 8px;">
          {{ loadingMessage }}
        </div>
      </ng-template>
    </div>
  `
})
export class PlacesComponent implements OnInit {
  places: any[] = [];
  loadingMessage: string = 'Django-дан мәліметтер күтілуде...';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // Өзгерісті қолмен сездіру үшін
  ) {}

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.apiService.getPlaces().subscribe({
      next: (data) => {
        console.log('Django-дан келген деректер:', data);
        this.places = data;
        this.loadingMessage = data.length === 0 ? 'База бос, орындар табылмады.' : '';
        this.cdr.detectChanges(); // Экранды жаңартуға мәжбүрлеу
      },
      error: (err) => {
        console.error('Қате шықты:', err);
        this.loadingMessage = 'Django серверіне қосылу мүмкін болмады.';
      }
    });
  }
}