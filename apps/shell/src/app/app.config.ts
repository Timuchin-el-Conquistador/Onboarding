import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { API_URL_TOKEN } from '@org/shared/tokens';
import { appConfig as authConfig } from '@org/auth/config';
import { appConfig as taskManagerConfig } from '@org/task-manager/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    ...authConfig.providers,
    ...taskManagerConfig.providers,
    {
      provide: API_URL_TOKEN,
      useValue: environment.apiUrl,
    },
  ],
};
