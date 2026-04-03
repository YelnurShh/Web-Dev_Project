import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="color: #2c3e50; text-align: center;">🎯 Кездесу қалаулары</h2>
      
      <div *ngIf="message" [ngStyle]="{'background': isError ? '#ffebee' : '#e8f5e9', 'color': isError ? '#c62828' : '#2e7d32'}" 
           style="padding: 10px; border-radius: 8px; margin-bottom: 15px; text-align: center; font-weight: bold;">
        {{ message }}
      </div>

      <div style="margin-bottom: 15px;">
        <label>Вайб:</label>
        <input type="text" [(ngModel)]="vibe" placeholder="Мысалы: Романтика..." style="width: 100%; padding: 10px; margin-top: 5px;">
      </div>
      <div style="margin-bottom: 20px;">
        <label>Бюджет:</label>
        <select [(ngModel)]="budget" style="width: 100%; padding: 10px; margin-top: 5px;">
          <option value="" disabled selected>Таңдаңыз...</option>
          <option value="Төмен">Төмен (Low)</option>
          <option value="Орташа">Орташа (Medium)</option>
          <option value="Жоғары">Жоғары (High)</option>
        </select>
      </div>
      <button (click)="submitPreference()" style="width: 100%; padding: 12px; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer;">
        Сақтау
      </button>

      <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">

      <h3 style="color: #2c3e50;">📋 Менің сақтаған қалауларым:</h3>
      <p *ngIf="myList.length === 0" style="color: #999;">Тізім бос...</p>
      
      <div *ngFor="let item of myList" style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid #4A90E2;">
        <div>
          <strong>✨ {{ item.desired_vibe }}</strong> <br>
          <span style="color: #666; font-size: 14px;">💰 Бюджет: {{ item.preferred_budget }}</span>
        </div>
        
        <button (click)="deletePref(item.id)" style="background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;">
          🗑 Өшіру
        </button>
      </div>

    </div>
  `
})
export class PreferencesComponent implements OnInit {
  vibe = '';
  budget = '';
  message = '';
  isError = false;
  myList: any[] = []; // Базадан келетін мәліметтер

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadList(); // Бет ашылғанда тізімді жүктейміз
  }

  // Базадан (Django) оқу
  loadList() {
    this.apiService.getPreferences().subscribe({
      next: (data) => {
        this.myList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Жүктеу қатесі', err)
    });
  }

  // Сақтау логикасы
  submitPreference() {
    if (!this.vibe || !this.budget) {
      this.message = 'Өрістерді толтырыңыз!'; this.isError = true;
      return;
    }
    const data = { desired_vibe: this.vibe, preferred_budget: this.budget };
    
    this.apiService.postPreference(data).subscribe({
      next: () => {
        this.message = 'Сәтті сақталды!'; this.isError = false;
        this.vibe = ''; this.budget = '';
        this.loadList(); // Сақтаған соң тізімді жаңартамыз
      },
      error: () => { this.message = 'Қате шықты.'; this.isError = true; }
    });
  }

  // Өшіру логикасы
  deletePref(id: number) {
    if(confirm('Бұл қалауды өшіруге сенімдісіз бе?')) {
      this.apiService.deletePreference(id).subscribe({
        next: () => {
          this.message = 'Қалау сәтті өшірілді!';
          this.isError = false;
          this.loadList(); // Өшірген соң тізімді жаңартамыз
        },
        error: (err) => {
          console.error(err);
          this.message = 'Өшіру мүмкін болмады. (Django-да URL бар-жоғын тексеріңіз)';
          this.isError = true;
          this.cdr.detectChanges();
        }
      });
    }
  }
}