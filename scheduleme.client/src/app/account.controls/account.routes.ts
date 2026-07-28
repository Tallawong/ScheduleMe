import { Routes } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog.component';
import { VerifyEmailComponent } from './verify-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

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
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
