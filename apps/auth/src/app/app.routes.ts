import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupPageComponent),
  },
  {
    path: 'reset',
    loadComponent: () =>
      import('./reset/reset.component').then(
        (c) => c.ResetPasswordPageComponent,
      ),
  },
  { path: 'reset-password', redirectTo: 'reset', pathMatch: 'full' },
];
