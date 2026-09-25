import { Route } from '@angular/router';
import { authGuard } from '@org/shared';
import { headerConfigResolver } from './resolvers';
import { HeaderComponent } from './components/header.component';

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
    canActivate: [authGuard],
    resolve: { config: headerConfigResolver },
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    loadChildren: () => import('@org/task-manager').then((m) => m.appRoutes),
    canActivate: [authGuard],
    resolve: { config: headerConfigResolver },
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
