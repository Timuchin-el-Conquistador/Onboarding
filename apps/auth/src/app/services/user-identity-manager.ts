import { inject, Injectable, signal } from '@angular/core';
import { API_URL_TOKEN } from '../tokens';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import type { IUser } from '../models';
import { Observable } from 'rxjs';
import { withLoading, withSuccessMessage } from '../operators';
import { SUCCESS_MESSAGES } from '../models';

export const HANDLE_LOGIN = new HttpContextToken(() => false);
export const HANDLE_LOGOUT = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class UserIdentityManager {
  readonly loading = signal(false);
  readonly successMessage = signal('');

  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);

  login(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-in/', user, {
        context: new HttpContext().set(HANDLE_LOGIN, true),
      })
      .pipe(
        withLoading(this.loading),
        withSuccessMessage(this.successMessage, SUCCESS_MESSAGES.LOGIN),
      );
  }

  signup(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-up/', user)
      .pipe(
        withLoading(this.loading),
        withSuccessMessage(this.successMessage, SUCCESS_MESSAGES.SIGN_UP),
      );
  }

  reset(user: IUser): Observable<unknown> {
    return this.#http
      .post(this.#base_url + '/v1/sign-in/reset', user)
      .pipe(
        withLoading(this.loading),
        withSuccessMessage(
          this.successMessage,
          SUCCESS_MESSAGES.RESET_PASSWORD,
        ),
      );
  }

  logout(): Observable<unknown> {
    return this.#http
      .delete(this.#base_url + '/v1/sign-in/out', {
        context: new HttpContext().set(HANDLE_LOGOUT, true),
      })
      .pipe(
        withLoading(this.loading),
        withSuccessMessage(this.successMessage, SUCCESS_MESSAGES.LOGOUT),
      );
  }
}
