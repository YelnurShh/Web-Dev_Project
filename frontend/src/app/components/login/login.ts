import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Формамен жұмыс істеу үшін қажет
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule қосылды
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(credentials).subscribe({
      next: (response) => {
        console.log('Сәтті кірдік! Токен:', response);
        // Токенді браузердің жадына сақтаймыз
        localStorage.setItem('auth_token', response.token);
        this.errorMessage = '';
        alert('Жүйеге сәтті кірдіңіз!');
      },
      error: (err) => {
        console.error('Қате:', err);
        this.errorMessage = 'Логин немесе пароль қате!';
      }
    });
  }
}