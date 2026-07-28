import { Routes } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog.component';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login-prompt.component').then((m) => m.LoginPromptComponent),
  },
  {
    path: 'register',
    component: RegisterDialogComponent,
    data: { title: 'Create Account', message: 'Sign up to get started' },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
