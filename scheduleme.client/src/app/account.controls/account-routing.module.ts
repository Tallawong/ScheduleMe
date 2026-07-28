import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout.component';
import { LoginPromptComponent } from './login-prompt.component';
import { RegisterDialogComponent } from './register-dialog.component';
import { VerifyEmailComponent } from './verify-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { ForgotPasswordMatComponent } from './forgot-password-mat.component';
import { RegistrationFormComponent } from '../core/controls/registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPromptComponent },
      {
        path: 'register',
        component: RegisterDialogComponent,
        /* data: { title: 'Create Account', message: 'Sign up to get started' } ,*/
      },
      { path: 'verify-email', component: VerifyEmailComponent },
      {
        path: 'forgot-password',
        component: ForgotPasswordMatComponent /*ForgotPasswordComponent*/,
      },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
