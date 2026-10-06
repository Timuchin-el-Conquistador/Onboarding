import { inject, Injectable } from '@angular/core';
import { WINDOW } from '@org/shared';
import { BaseEventManagerService } from './base-event-manager.service';

@Injectable({ providedIn: 'root' })
export class BrowserEventManager implements BaseEventManagerService<string> {
  readonly #window = inject(WINDOW);

  dispatch(event: string): void {
    this.#window.postMessage(event);
  }
}
