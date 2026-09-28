import { inject, Injectable } from '@angular/core';
import { EVENTS } from '@org/my-lib/tokens';
import { WINDOW } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class AppEventManager {
  readonly #window = inject(WINDOW);
  readonly #events = inject(EVENTS);

  constructor() {
    this.#events.forEach(({ type, action }) =>
      this.#window.addEventListener(type, action),
    );
  }

  clean(): void {
    this.#events.forEach(({ type, action }) =>
      this.#window.removeEventListener(type, action),
    );
  }

  dispatch(event: Event): void {
    this.#window.dispatchEvent(event);
  }
}
