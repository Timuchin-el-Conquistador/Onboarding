import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HANDLE_LOGIN, HANDLE_LOGOUT } from '../services/user-identity-manager';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '@org/shared';
import { AUTH_TOKEN } from '@org/shared';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const storage = inject(LOCAL_STORAGE);

  if (req.context.get(HANDLE_LOGIN)) {
    return next(req).pipe(
      tap((event) => {
        if (event.type !== HttpEventType.Response) {
          return;
        }

        const token = event.headers.get(AUTH_TOKEN);

        if (token) {
          storage.setItem(AUTH_TOKEN, token);
        }
      }),
    );
  }

  if (req.context.get(HANDLE_LOGOUT)) {
    const token = storage.getItem(AUTH_TOKEN) ?? '';
    const newReq = req.clone({
      headers: req.headers.append(AUTH_TOKEN, token),
    });

    return next(newReq);
  }

  return next(req);
}
