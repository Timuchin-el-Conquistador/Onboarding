import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const service = inject(AuthService);
  const router = inject(Router);

  return service.isAuthenticated() || router.navigate(['auth']);
};
