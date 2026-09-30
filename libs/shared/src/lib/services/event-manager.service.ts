import { inject, Injectable } from '@angular/core';
import { EVENTS } from '@org/my-lib/tokens';
import { WINDOW } from '@org/shared';
import { BaseEventManagerService } from './base-event-manager.service';

@Injectable({
  providedIn: 'root',
})
export class BrowserEventManager implements BaseEventManagerService {
  readonly #window = inject(WINDOW);
  readonly #events = inject(EVENTS);

  subscribe() {
    this.#events.forEach(({ type, action }) =>
      this.#window.addEventListener(type, action),
    );
  }

  dispatch(event: Event): void {
    this.#window.dispatchEvent(event);
  }

  clean(): void {
    this.#events.forEach(({ type, action }) =>
      this.#window.removeEventListener(type, action),
    );
  }
}
