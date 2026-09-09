import { MatDialogConfig } from '@angular/material/dialog';

export const CONFIRM_MODAL_DEFAULT_LAYOUT: MatDialogConfig = {
  minWidth: '32rem',
  maxWidth: '90vw',
  width: '600px',
  minHeight: '200px',
  maxHeight: '90vh',
  height: 'auto',
  panelClass: 'confirm-dialog',
  autoFocus: false,
  restoreFocus: true,
  disableClose: true,
};
