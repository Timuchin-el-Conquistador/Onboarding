import { inject, Injectable, signal } from '@angular/core';
import { API_URL_TOKEN } from '@org/shared/tokens';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { IUser } from '../models';
import { Observable } from 'rxjs';
import { withSuccessMessage } from '../operators';
import { withLoading } from '@org/shared/tokens';
import { SUCCESS_MESSAGES } from '../models';
import { AuthAction } from '../types';
import { AUTH_ACTION } from '../tokens';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';

@Injectable()
export class UserIdentityManager {
  readonly successMessage = signal('');

  readonly loader = inject(LOADER_MANAGER_SERVICE);

  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);

  login(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-in/', user, {
        context: new HttpContext().set(AUTH_ACTION, AuthAction.Login),
      })
      .pipe(
        withLoading(this.loader),
        withSuccessMessage(this.successMessage, SUCCESS_MESSAGES.LOGIN),
      );
  }

  signup(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-up/', user, {
        context: new HttpContext().set(AUTH_ACTION, AuthAction.Signup),
      })
      .pipe(
        withLoading(this.loader),
        withSuccessMessage(this.successMessage, SUCCESS_MESSAGES.SIGN_UP),
      );
  }

  reset(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-in/reset', user, {
        context: new HttpContext().set(AUTH_ACTION, AuthAction.Reset),
      })
      .pipe(
        withLoading(this.loader),
        withSuccessMessage(
          this.successMessage,
          SUCCESS_MESSAGES.RESET_PASSWORD,
        ),
      );
  }

  logout(): Observable<unknown> {
    return this.#http
      .delete(this.#base_url + '/v1/sign-in/out', {
        context: new HttpContext().set(AUTH_ACTION, AuthAction.Logout),
      })
      .pipe(withLoading(this.loader));
  }
}
