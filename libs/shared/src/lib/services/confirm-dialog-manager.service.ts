import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/modals/confirm/confirm-modal.component';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IConfirmDialogDataConfig } from '../models';
import { CONFIRM_MODAL_DEFAULT_LAYOUT } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogManagerService {
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  readonly #dialog = inject(MatDialog);

  open(config: MatDialogConfig<IConfirmDialogDataConfig>): void {
    const cfg: MatDialogConfig<IConfirmDialogDataConfig> = {
      ...CONFIRM_MODAL_DEFAULT_LAYOUT,
      ...config,
    };

    this.dialogRef = this.#dialog.open(ConfirmDialogComponent, cfg);
  }

  confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1));
  }
}
