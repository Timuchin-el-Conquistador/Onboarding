import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HANDLE_LOGIN, HANDLE_LOGOUT } from '../services/user-identity-manager';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (req.context.get(HANDLE_LOGIN)) {
    return next(req).pipe(
      tap((event) => {
        if (event.type !== HttpEventType.Response) {
          return;
        }

        const token = event.headers.get('T-Auth');

        if (token) {
          localStorage.setItem('T-Auth', token);
        }
      }),
    );
  }

  if (req.context.get(HANDLE_LOGOUT)) {
    const token = localStorage.getItem('T-Auth') ?? '';
    const newReq = req.clone({
      headers: req.headers.append('T-Auth', token),
    });
    return next(newReq);
  }

  return next(req);
}
