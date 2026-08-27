import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HANDLE_LOGIN, HANDLE_LOGOUT } from '../services/user-identity-manager';
import { inject } from '@angular/core';
import { LOCAL_STORAGE, T_AUTH_HEADER } from '../tokens';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authHeader = inject(T_AUTH_HEADER);
  const storage = inject(LOCAL_STORAGE);

  if (req.context.get(HANDLE_LOGIN)) {
    return next(req).pipe(
      tap((event) => {
        if (event.type !== HttpEventType.Response) {
          return;
        }

        const token = event.headers.get(authHeader);

        if (token) {
          storage.setItem(authHeader, token);
        }
      }),
    );
  }

  if (req.context.get(HANDLE_LOGOUT)) {
    const token = storage.getItem(authHeader) ?? '';
    const newReq = req.clone({
      headers: req.headers.append('T-Auth', token),
    });

    return next(newReq);
  }

  return next(req);
}
