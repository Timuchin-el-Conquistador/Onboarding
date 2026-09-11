import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { IConfirmDialogDataConfig } from '../../../models';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatDialogClose,
    MatButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly data: IConfirmDialogDataConfig = inject(MAT_DIALOG_DATA);
}
