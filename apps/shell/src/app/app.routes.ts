import { Route } from '@angular/router';
import { authGuard } from '@org/shared';
import { headerConfigResolver } from './resolvers';
import { HeaderComponent } from './components/header.component';
import { appConfig as authConfig } from '@org/auth/config';
import { appConfig as taskManagerConfig } from '@org/task-manager/config';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: HeaderComponent,
    loadChildren: () => import('@org/auth').then((m) => m.appRoutes),
    resolve: { config: headerConfigResolver },
    providers: [...authConfig.providers],
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    loadChildren: () => import('@org/task-manager').then((m) => m.appRoutes),
    resolve: { config: headerConfigResolver },
    canActivate: [authGuard],
    providers: [...taskManagerConfig.providers],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
