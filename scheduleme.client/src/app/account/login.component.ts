import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../services';

@Component({
  templateUrl: 'login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private alertService = inject(AlertService);

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    dob: ['', Validators.required],
  });
  submitted = false;
  loading = false;

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const { email, password, dob } = this.form.value;
    this.accountService
      .login(email!, password!, dob!)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
