import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token); // ✅ use AuthService method to store token
        this.message = 'Login successful!';
        this.router.navigate(['/todos']);       // ✅ redirect to todos page
      },
      error: (err) => {
        this.message = err.error.error || 'Login failed';
      },
    });
  }
}
