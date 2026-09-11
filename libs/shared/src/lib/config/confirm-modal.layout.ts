import { MatDialogConfig } from '@angular/material/dialog';
import { IConfirmDialogDataConfig } from '../models';

export const DEFAULT_CONFIRM_DIALOG_DATA: IConfirmDialogDataConfig = {
  title: 'Information',
  message: 'Please review the information before continuing.',
  buttons: [
    {
      label: 'OK',
      value: true,
      color: 'primary',
      variant: 'raised',
    },
  ],
};

export const CONFIRM_MODAL_DEFAULT_LAYOUT: MatDialogConfig<IConfirmDialogDataConfig> =
  {
    minWidth: '32rem',
    maxWidth: '90vw',
    width: '600px',
    minHeight: '200px',
    maxHeight: '90vh',
    height: 'auto',
    panelClass: 'confirm-dialog',
    autoFocus: false,
    restoreFocus: true,
    disableClose: false,
    data: DEFAULT_CONFIRM_DIALOG_DATA,
  };
