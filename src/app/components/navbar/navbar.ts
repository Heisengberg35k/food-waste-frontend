import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})

export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  userRole = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    // ✅ Prevent SSR crash
    if (typeof window === 'undefined') {
      return;
    }

    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.getProfile();
    }
  }

  getProfile() {
  if (typeof window === 'undefined') return;

  const token = localStorage.getItem('token');

  if (!token) return;

  this.http.get('http://localhost:5000/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .subscribe({
    next: (data: any) => {
      this.userRole = data.role;
    },
    error: (err) => {
      console.error("Profile error:", err);
    }
  });
  }

  logout() {
    // ✅ Safe localStorage usage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }

    this.isLoggedIn = false;
    this.userRole = '';

    this.router.navigate(['/login']);
  }
}