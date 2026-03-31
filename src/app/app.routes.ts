import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';
import { Analytics } from './components/analytics/analytics';
import { Food } from './components/food/food';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: Register },
  { path: 'analytics', component: Analytics, canActivate: [authGuard] },
  { path: 'food', component: Food },
  { path: '**', redirectTo: '' }
];