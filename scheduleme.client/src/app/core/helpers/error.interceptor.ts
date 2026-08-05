import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../../services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let accountService = inject(AccountService);
  return next(req).pipe(catchError((err: unknown) => {
    const message = getErrorMessage(err);

    if (isHttpErrorResponse(err) && [401, 403].includes(err.status) && accountService.accountValue) {
      // auto logout if 401 or 403 response returned from api
      accountService.logout();
    }
    console.error('ErrorInterceptor:', message, err);
    return throwError(() => err);

  }))


};

function getErrorMessage(err: unknown): string {
  if (err == null) {
    return 'Unknown Error';
  }

  if (typeof err === 'string') {
    return err;
  }

  if (typeof err === 'number' || typeof err === 'boolean') {
    return String(err);
  }

  if (err instanceof Error) {
    return err.message || err.name || 'Unknown Error';
  }

  if (typeof err !== 'object') {
    return 'Unknown Error';
  }

  const e = err as Record<string, any>;

  if (e['error']) {
    return getErrorMessage(e['error']);
  }

  return e['errorMessage'] || e['title'] || e['message'] || e['statusText'] || 'Unknown Error';
}

function isHttpErrorResponse(err: unknown): err is HttpErrorResponse {
  return err instanceof HttpErrorResponse;
}
