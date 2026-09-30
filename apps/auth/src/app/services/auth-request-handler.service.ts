import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import {
  withDispatchEvent,
  withRemoveToken,
  withStoreToken,
} from '../operators';
import {
  APP_EVENTS,
  AUTH_TOKEN,
  BaseEventManagerService,
  LOCAL_STORAGE,
} from '@org/shared';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthRequestHandlerService {
  readonly #storage = inject(LOCAL_STORAGE);
  readonly #eventManager = inject(BaseEventManagerService);

  handleLogin(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
      withDispatchEvent(
        this.#eventManager,
        new CustomEvent(APP_EVENTS.AUTH_USER_LOGGED_IN),
      ),
      withStoreToken(this.#storage, AUTH_TOKEN),
    );
  }

  handleLogout(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<unknown>> {
    const token = this.#storage.getItem(AUTH_TOKEN) ?? '';

    const newReq = req.clone({
      headers: req.headers.set(AUTH_TOKEN, token),
    });

    return next(newReq).pipe(
      withDispatchEvent(
        this.#eventManager,
        new CustomEvent(APP_EVENTS.AUTH_USER_LOGGED_OUT),
      ),
      withRemoveToken(this.#storage, AUTH_TOKEN),
    );
  }
}
