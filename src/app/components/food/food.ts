import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food.html',
  styleUrls: ['./food.css']
})
export class Food implements OnInit {

  foods: any[] = [];

newFood = {
  title: '',
  description: '',
  quantity: 0,
  expiry_date: '',
  location: ''
};

  constructor(private http: HttpClient) {}

ngOnInit() {
  console.log("Food page loaded");   // debug
  this.loadPage();
}

loadPage() {
  this.getProfile();
  this.getFoods();
}

getFoods() {
  this.http.get('http://localhost:5000/api/food')
    .subscribe({
      next: (data: any) => {
        console.log("FOODS:", data);   // debug
        this.foods = data;
      },
      error: (err) => {
        console.error("ERROR:", err);
      }
    });
}

addFood() {
  this.http.post('http://localhost:5000/api/food', this.newFood)
    .subscribe({
      next: () => {
        console.log("Food added");
        this.getFoods();   // refresh list
      },
      error: (err) => {
        console.error("Add error:", err);
      }
    });
}

  requestFood(id: string) {
  this.http.post(`http://localhost:5000/api/food/${id}/request`, {})
    .subscribe(() => {
      this.getFoods();
    });
}

approveFood(id: string) {
  this.http.post(`http://localhost:5000/api/food/${id}/approve`, {})
    .subscribe(() => {
      this.getFoods();
    });
}

completeFood(id: string) {
  this.http.post(`http://localhost:5000/api/food/${id}/complete`, {})
    .subscribe(() => {
      this.getFoods();
    });
}

userRole: string = '';



getProfile() {
  this.http.get('http://localhost:5000/api/auth/profile')
    .subscribe((data: any) => {
      this.userRole = data.role;
    });
}
  
}
