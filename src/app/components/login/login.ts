import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // ✅ ADD THIS
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
        console.log("LOGIN RESPONSE:", res);

        // 🔥 IMPORTANT FIX
        const token = res.access_token || res.token;

        if (token) {
          localStorage.setItem('token', token);
          console.log("TOKEN SAVED:", token);

          this.message = 'Login successful!';
          this.router.navigate(['/']);
        } else {
          this.message = 'Login failed!';
        }
      },
      error: (err) => {
        console.error("LOGIN ERROR:", err);
        this.message = 'Login failed!';
      }
    });
  }
}