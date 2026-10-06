import { Injectable } from '@angular/core';
import { BaseEventManagerService } from './base-event-manager.service';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrowserEventManager implements BaseEventManagerService<string> {
  readonly #events$ = new ReplaySubject<string>(1);

  readonly events$ = this.#events$.asObservable();

  dispatch(message: string): void {
    this.#events$.next(message);
  }
}
