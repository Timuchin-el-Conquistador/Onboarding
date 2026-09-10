import { Injectable, signal } from '@angular/core';
import { ILoaderManagerService } from '../models';

@Injectable()
export class LoaderManagerService implements ILoaderManagerService {
  readonly loading = signal(false);

  show(): void {
    this.loading.set(true);
  }

  hide(): void {
    this.loading.set(false);
  }
}
