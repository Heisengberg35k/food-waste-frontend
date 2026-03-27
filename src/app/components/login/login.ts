import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {

  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        this.message = 'Login successful!';
      },
      error: () => {
        this.message = 'Login failed!';
      }
    });
  }
}