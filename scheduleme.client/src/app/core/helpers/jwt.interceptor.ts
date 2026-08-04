import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from '../../services';
import { environment } from '../../../environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';

//@Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private accountService: AccountService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     add auth header with jwt if account is logged in and request is to the api url
//     const account = this.accountService.accountValue;
//     const isLoggedIn = account && account.jwtToken;
//     const isApiUrl = request.url.startsWith(environment.apiUrl);
//     if (isLoggedIn && isApiUrl) {
//       request = request.clone({
//         setHeaders: { Authorization: `Bearer ${account.jwtToken}` },
//       });
//     }

//     return next.handle(request);
//   }
// }

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
