import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserIdentityManager } from './services';
import { inject } from '@angular/core';
import { AppRoute } from './app.routes';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);

  const authService = inject(UserIdentityManager);
  return authService.isAuthenticated()
    ? true
    : router.createUrlTree([AppRoute.Login]);
};
