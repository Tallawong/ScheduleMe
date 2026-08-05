import { ApplicationConfig, provideAppInitializer, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AccountService } from './services';
import { CookieService } from 'ngx-cookie-service';
import { initializeApp } from './core/helpers/app.initializer';
import { errorInterceptor } from './core/helpers/error.interceptor';
import { jwtInterceptor } from './core/helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    /* This is the router feature that auto-binds route data/params/query-params 
    to matching input()-declared component properties. */
    provideRouter(routes, withComponentInputBinding()),

    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor]) // Register interceptors here
    ),
    CookieService,
    // Standard Modern Syntax (Angular 18+)
    provideAppInitializer(() => {
      const accountService = inject(AccountService);
      return initializeApp(accountService)();
    })
  ],
};
