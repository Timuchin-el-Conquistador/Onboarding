import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '@org/shared/tokens'

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authToken = 'T-Auth';

  const storage = inject(LOCAL_STORAGE);

  const token =
    storage.getItem(authToken) ?? '4b2913cf-706c-4906-b9ab-7a33c0733';

  const newReq = req.clone({
    headers: req.headers.append(authToken, token),
  });

  return next(newReq);
}
