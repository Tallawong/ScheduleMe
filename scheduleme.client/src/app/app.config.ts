import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    /* This is the router feature that auto-binds route data/params/query-params 
    to matching input()-declared component properties. */
    provideRouter(routes, withComponentInputBinding()),

    provideHttpClient(), // Registers the HttpClient service globally
  ],
};
