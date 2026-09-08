import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { IToaster } from '../models/toaster.model';

@Injectable({
  providedIn: 'root',
})
export class ToasterService implements IToaster {
  readonly #snackBar = inject(MatSnackBar);

  success(message: string, duration = 4000, action = 'Close'): void {
    this.#open(`✅ ${message}`, action, {
      duration,
      panelClass: ['success-toast'],
    });
  }

  error(message: string, duration = 4000, action = 'Close'): void {
    this.#open(`❌ ${message}`, action, {
      duration,
      panelClass: ['error-toast'],
    });
  }

  #open(
    message: string,
    action: string,
    config: Partial<MatSnackBarConfig> = {},
  ): void {
    const finalConfig: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      ...config,
    };

    this.#snackBar.open(message, action, finalConfig);
  }
}
