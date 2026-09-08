import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { environment } from '../environments/environment';
import { API_URL_TOKEN } from '@org/shared/tokens';
import { authInterceptor } from '@org/my-lib/interceptors';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(MatSnackBarModule),
    { provide: API_URL_TOKEN, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
