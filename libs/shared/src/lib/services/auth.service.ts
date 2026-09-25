import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens';
import { AUTH_TOKEN } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #storage = inject(LOCAL_STORAGE);

  isAuthenticated(): boolean {
    return !!this.#storage.getItem(AUTH_TOKEN);
  }
}
