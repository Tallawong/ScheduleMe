import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from '../../services';
import { environment } from '../../../environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let accountService = inject(AccountService);
  // add auth header with jwt if account is logged in and request is to the api url
  const account = accountService.accountValue;
  const isLoggedIn = account && account.jwtToken;
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${account.jwtToken}` },
    });
  }

  return next(req);
};
