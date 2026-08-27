import { inject, Injectable, signal } from '@angular/core';
import { API_URL_TOKEN, LOCAL_STORAGE } from '../tokens';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import type { IUser } from '../models';
import { finalize } from 'rxjs';

export const HANDLE_LOGIN = new HttpContextToken(() => false);
export const HANDLE_LOGOUT = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class UserIdentityManager {
  loading = signal(false);

  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #storage = inject(LOCAL_STORAGE);

  login(user: IUser) {
    this.loading.set(true);
    return this.#http
      .post(this.#base_url + '/v1/sign-in/', user, {
        context: new HttpContext().set(HANDLE_LOGIN, true),
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      );
  }

  signup(user: IUser) {
    this.loading.set(true);
    return this.#http.post(this.#base_url + '/v1/sign-up/', user).pipe(
      finalize(() => {
        this.loading.set(false);
      }),
    );
  }

  reset(user: IUser) {
    this.loading.set(true);
    return this.#http.post(this.#base_url + '/v1/sign-in/reset', user).pipe(
      finalize(() => {
        this.loading.set(false);
      }),
    );
  }

  logout() {
    this.loading.set(true);
    return this.#http
      .delete(this.#base_url + '/v1/sign-in/out', {
        context: new HttpContext().set(HANDLE_LOGOUT, true),
      })
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      );
  }

  isAuthenticated() {
    const isAuthenticated = !!this.#storage.getItem('T-Auth');
    return isAuthenticated;
  }
}
