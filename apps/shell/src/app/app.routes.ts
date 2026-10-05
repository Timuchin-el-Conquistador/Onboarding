import { Route } from '@angular/router';
import {
  API_URL_TOKEN,
  authGuard,
  environment,
  ShellRoutes,
} from '@org/shared';
import { appConfig as authConfig } from '@org/auth/config';
import { appConfig as taskManagerConfig } from '@org/task-manager/config';
import { ListenerComponent } from './components/listener.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ShellRoutes.Auth,
  },
  {
    path: ShellRoutes.Auth,
    component: ListenerComponent,
    loadChildren: () => {
      return import('@org/auth').then((m) => m.appRoutes);
    },
    providers: [
      ...authConfig.providers,
      {
        provide: API_URL_TOKEN,
        useValue: environment.apiUrl,
      },
    ],
  },
  {
    path: ShellRoutes.Dashboard,
    component: ListenerComponent,
    loadChildren: () => import('@org/task-manager').then((m) => m.appRoutes),
    canActivate: [authGuard],
    providers: [
      ...taskManagerConfig.providers,
      {
        provide: API_URL_TOKEN,
        useValue: environment.apiUrl,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ShellRoutes.Auth,
  },
];
