import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { appConfig as authConfig } from '@org/auth/config';
import { appConfig as taskManagerConfig } from '@org/task-manager/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    ...authConfig.providers,
    ...taskManagerConfig.providers,
  ],
};
