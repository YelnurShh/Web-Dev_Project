import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  register(): void {
    this.error = '';
    this.api.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/places']);
      },
      error: (err) => { this.error = err.error?.username?.[0] || 'Registration failed'; }
    });
  }
}
