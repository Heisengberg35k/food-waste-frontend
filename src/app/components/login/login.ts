import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    const data = {
      email: this.email.trim(),
      password: this.password.trim()
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log("RESPONSE:", res);

        if (res.access_token) {
          // Store JWT token
          localStorage.setItem('token', res.access_token);

          // Show success message
          this.message = 'Login successful!';

          // Redirect to home page
          this.router.navigate(['/']);
        } else {
          this.message = 'Login failed!';
        }
      },
      error: (err) => {
        console.error("ERROR:", err);
        this.message = 'Login failed!';
      }
    });
  }
}