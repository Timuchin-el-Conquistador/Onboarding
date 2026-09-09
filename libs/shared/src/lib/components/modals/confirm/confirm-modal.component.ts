import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DialogOptionsType } from '../../../models';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly data: DialogOptionsType = inject(MAT_DIALOG_DATA);

  readonly mdDialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }

  cancel(): void {
    this.close(false);
  }

  close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  confirm(): void {
    this.close(true);
  }
}
