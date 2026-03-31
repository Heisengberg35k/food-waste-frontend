import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
})
export class Register {

  name = '';
  email = '';
  password = '';
  role = '';
  city = ''; // ✅ ADD THIS
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {

    // ✅ FRONTEND VALIDATION
    if (!this.name || !this.email || !this.password || !this.role || !this.city) {
      this.message = "Please fill all fields";
      return;
    }

    const data = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      role: this.role,
      city: this.city // ✅ SEND THIS
    };

    this.http.post('http://localhost:5000/api/auth/register', data)
      .subscribe({
        next: () => {
          this.message = "Registration successful!";
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          console.error(err);

          this.message =
            err.error?.message ||
            err.error?.error ||
            "Registration failed!";
        }
      });
  }
}