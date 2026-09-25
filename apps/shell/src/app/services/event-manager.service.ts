import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_EVENTS } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class AppEventManager {
  readonly #router = inject(Router);

  constructor() {
    window.addEventListener(
      APP_EVENTS.AUTH_USER_LOGGED_IN,
      this.#handleUserLoggedIn,
    );
  }

  clean() {
    window.removeEventListener(
      APP_EVENTS.AUTH_USER_LOGGED_IN,
      this.#handleUserLoggedIn,
    );
  }

  #handleUserLoggedIn = () => {
    this.#router.navigate(['/dashboard']);
  };
}
