import { Route } from '@angular/router';
import { API_URL_TOKEN, authGuard, ShellRoutes } from '@org/shared';
import { headerConfigResolver } from './resolvers';
import { HeaderComponent } from './components/header.component';
import { appConfig as taskManagerConfig } from '@org/task-manager/config';
import { environment } from '../environments/environment';
import { appConfig as authConfig } from '@org/auth/config';

export const appRoutes: Route[] = [
  {
    path: ShellRoutes.Root,
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: ShellRoutes.Auth,
    component: HeaderComponent,
    loadChildren: () => import('@org/auth').then((m) => m.appRoutes),
    resolve: { config: headerConfigResolver },
    runGuardsAndResolvers: 'always',
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
    component: HeaderComponent,
    loadChildren: () => import('@org/task-manager').then((m) => m.appRoutes),
    resolve: { config: headerConfigResolver },
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
    redirectTo: 'auth',
  },
];
