import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  
  // Added properties for password visibility and loading state
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle the visibility of the password field
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    // Set isLoading to true during the login request
    this.isLoading = true;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.message = 'Login successful!';
        this.router.navigate(['/todos']);
        this.isLoading = false;
      },
      error: (err) => {
        this.message = err.error.error || 'Login failed';
        this.isLoading = false;
      },
    });
  }
}
