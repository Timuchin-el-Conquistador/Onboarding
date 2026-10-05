import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import {
  API_URL_TOKEN,
} from '@org/shared';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors';
import { loadingInterceptor } from '@org/shared/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: API_URL_TOKEN,
      useValue: environment.apiUrl,
    },
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  ],
};
