import { Route } from '@angular/router';
import { authGuard } from './custom-name-guard';

export enum AppRoute {
  Root = '',
  Login = 'login',
  Register = 'register',
  Reset = 'reset',
  ResetPassword = 'reset-password',
}

export const appRoutes: Route[] = [
  { path: AppRoute.Root, redirectTo: AppRoute.Login, pathMatch: 'full' },
  {
    path: AppRoute.Login,
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginPageComponent),
  },
  {
    path: AppRoute.Register,
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupPageComponent),
  },
  {
    path: AppRoute.Reset,
    loadComponent: () =>
      import('./reset/reset.component').then(
        (c) => c.ResetPasswordPageComponent,
      ),
  },
  {
    path: 'test',
    canActivate: [authGuard],
  }
];
