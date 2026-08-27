import { inject, Injectable } from '@angular/core';
import { API_URL_TOKEN } from '../tokens';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import type { User } from '../models';

export const HANDLE_LOGIN = new HttpContextToken(() => false);

export const HANDLE_LOGOUT = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class UserIdentityManager {
  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);

  login(user: User) {
    return this.#http.post(this.#base_url + '/v1/sign-in/', user, {
      context: new HttpContext().set(HANDLE_LOGIN, true),
    });
  }

  signup(user: User) {
    return this.#http.post(this.#base_url + '/v1/sign-up/', user);
  }

  reset(user: User) {
    return this.#http.post(this.#base_url + '/v1/sign-in/reset', user);
  }

  logout() {
    return this.#http.delete(this.#base_url + '/v1/sign-in/out', {
      context: new HttpContext().set(HANDLE_LOGOUT, true),
    });
  }

  isAuthenticated(){
    const isAuthenticated = !!localStorage.getItem('T-Auth')
    return isAuthenticated
  }
}
