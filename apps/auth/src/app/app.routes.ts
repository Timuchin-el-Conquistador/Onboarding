import { Route } from '@angular/router';
import { AppRoutes } from '@org/shared';

export const appRoutes: Route[] = [
  { path: AppRoutes.Root, redirectTo: AppRoutes.Login, pathMatch: 'full' },
  {
    path: AppRoutes.Login,
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginPageComponent),
  },
  {
    path: AppRoutes.Register,
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupPageComponent),
  },
  {
    path: AppRoutes.Reset,
    loadComponent: () =>
      import('./reset/reset.component').then(
        (c) => c.ResetPasswordPageComponent,
      ),
  },
];
