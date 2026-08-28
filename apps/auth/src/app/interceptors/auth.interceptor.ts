import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HANDLE_LOGIN, HANDLE_LOGOUT } from '../services/user-identity-manager';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens';
import { AUTH_HEADER } from '../models';

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

        const token = event.headers.get(AUTH_HEADER);

        if (token) {
          storage.setItem(AUTH_HEADER, token);
        }
      }),
    );
  }

  if (req.context.get(HANDLE_LOGOUT)) {
    const token = storage.getItem(AUTH_HEADER) ?? '';
    const newReq = req.clone({
      headers: req.headers.append(AUTH_HEADER, token),
    });

    return next(newReq);
  }

  return next(req);
}
