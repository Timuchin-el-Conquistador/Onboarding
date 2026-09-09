import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/modals/confirm/confirm-modal.component';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DialogOptionsType } from '../models';
import { CONFIRM_MODAL_DEFAULT_LAYOUT } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogManagerService {
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  readonly #dialog = inject(MatDialog);

  open(
    options: DialogOptionsType,
    layout: MatDialogConfig = CONFIRM_MODAL_DEFAULT_LAYOUT,
  ): void {
    const cfg: MatDialogConfig<DialogOptionsType> = {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
      ...layout,
    };

    this.dialogRef = this.#dialog.open(ConfirmDialogComponent, cfg);
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1));
  }
}
