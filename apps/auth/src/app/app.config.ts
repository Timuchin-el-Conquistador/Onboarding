import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { AUTH_FORM_FACTORY, CredentialsFormFactory } from './forms';
import { FormBuilder } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: AUTH_FORM_FACTORY,
      useFactory: (fb: FormBuilder) => new CredentialsFormFactory(fb),
      deps: [FormBuilder],
    },
  ],
};
