import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: (res) => {
        this.message = 'Registration successful!';
      },
      error: (err) => {
        this.message = err.error.error || 'Registration failed';
      },
    });
  }
}
