import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthAction } from '../types';
import { inject } from '@angular/core';
import { AUTH_ACTION } from '../tokens';
import { AuthRequestHandlerService } from '../services';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const action = req.context.get(AUTH_ACTION);

  const authRequestHandler = inject(AuthRequestHandlerService);

  switch (action) {
    case AuthAction.Login:
      return authRequestHandler.handleLogin(req, next);
    case AuthAction.Logout:
      return authRequestHandler.handleLogout(req, next);
    case AuthAction.None:
    case AuthAction.Reset:
    case AuthAction.Signup:
    default:
      return next(req);
  }
}
