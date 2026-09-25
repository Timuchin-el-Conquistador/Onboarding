import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_URL_TOKEN } from '@org/shared/tokens';
import { authInterceptor } from '@org/my-lib/interceptors';
import { loadingInterceptor } from '@org/shared/interceptors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    importProvidersFrom(MatSnackBarModule),
    { provide: API_URL_TOKEN, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  ],
};
