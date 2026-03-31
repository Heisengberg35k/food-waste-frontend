import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {

  analytics: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.http.get('http://localhost:5000/api/analytics/summary')
      .subscribe({
        next: (data) => {
          console.log('API Response:', data);
          this.analytics = data;
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }
}