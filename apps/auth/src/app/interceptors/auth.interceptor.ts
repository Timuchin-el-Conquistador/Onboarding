import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthAction } from '../types';
import { inject } from '@angular/core';
import { APP_EVENTS, LOCAL_STORAGE } from '@org/shared';
import { AUTH_TOKEN } from '@org/shared';
import { AppEventManager } from '@org/shared';
import { AUTH_ACTION } from '../tokens';
import {
  withDispatchEvent,
  withRemoveToken,
  withStoreToken,
} from '../operators';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const storage = inject(LOCAL_STORAGE);
  const eventManager = inject(AppEventManager);

  const action = req.context.get(AUTH_ACTION);

  switch (action) {
    case AuthAction.Login:
      return next(req).pipe(
        withDispatchEvent(
          eventManager,
          new CustomEvent(APP_EVENTS.AUTH_USER_LOGGED_IN),
        ),
        withStoreToken(storage, AUTH_TOKEN),
      );

    case AuthAction.Logout:
      const token = storage.getItem(AUTH_TOKEN) ?? '';

      const newReq = req.clone({
        headers: req.headers.set(AUTH_TOKEN, token),
      });

      return next(newReq).pipe(
        withDispatchEvent(
          eventManager,
          new CustomEvent(APP_EVENTS.AUTH_USER_LOGGED_OUT),
        ),
        withRemoveToken(storage, AUTH_TOKEN),
      );
    case AuthAction.None:
    case AuthAction.Reset:
    case AuthAction.Signup:
    default:
      return next(req);
  }
}
