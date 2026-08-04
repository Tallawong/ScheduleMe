import { ApplicationConfig, provideAppInitializer, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AccountService } from './services';
import { authInterceptor, initializeApp } from './core/helpers';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    /* This is the router feature that auto-binds route data/params/query-params 
    to matching input()-declared component properties. */
    provideRouter(routes, withComponentInputBinding()),

    provideHttpClient(
      withInterceptors([authInterceptor, authInterceptor]) // Register interceptor here
    ),
    CookieService,
    // Standard Modern Syntax (Angular 18+)
    provideAppInitializer(() => {
      const accountService = inject(AccountService);
      return initializeApp(accountService)();
    })
  ],
};
