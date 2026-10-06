import { Route } from '@angular/router';
import { AppRoutes } from './config';
import { UserIdentityManager } from './services';
import { ListenerComponent } from './listener/listener.component';

export const appRoutes: Route[] = [
  {
    path: AppRoutes.Root,
    component: ListenerComponent,
    providers: [UserIdentityManager],
    children: [
      {
        path: AppRoutes.Root,
        redirectTo: AppRoutes.Login,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.Login,
        loadComponent: () =>
          import('./login/login.component').then((c) => c.LoginPageComponent),
      },
      {
        path: AppRoutes.Register,
        loadComponent: () =>
          import('./signup/signup.component').then(
            (c) => c.SignupPageComponent,
          ),
      },
      {
        path: AppRoutes.Reset,
        loadComponent: () =>
          import('./reset/reset.component').then(
            (c) => c.ResetPasswordPageComponent,
          ),
      },
    ],
  },
];
