import { Route } from '@angular/router';
import { AppRoutes } from '@org/shared';
import { LogoutPageComponent } from './logout/logout.component';
import { UserIdentityManager } from './services';

export const appRoutes: Route[] = [
  { path: AppRoutes.Root, redirectTo: AppRoutes.Login, pathMatch: 'full' },
  {
    path: AppRoutes.Login,
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginPageComponent),
    providers: [UserIdentityManager],
  },
  {
    path: AppRoutes.Register,
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupPageComponent),
    providers: [UserIdentityManager],
  },
  {
    path: AppRoutes.Reset,
    loadComponent: () =>
      import('./reset/reset.component').then(
        (c) => c.ResetPasswordPageComponent,
      ),
    providers: [UserIdentityManager],
  },
  {
    path: AppRoutes.Logout,
    component: LogoutPageComponent,
    providers: [UserIdentityManager],
  },
];
