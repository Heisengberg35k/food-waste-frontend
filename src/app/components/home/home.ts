import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],  // ✅ ADD THIS
})

export class Home implements OnInit {

  userRole = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get('http://localhost:5000/api/auth/profile')
      .subscribe((data: any) => {
        this.userRole = data.role;
      });
  }
}