import { IConfirmDialogDataConfig } from '@org/shared/models';
import { MatDialogConfig } from '@angular/material/dialog';

export const CONFIRM_MODAL_CONFIG: MatDialogConfig<IConfirmDialogDataConfig> = {
  data: {
    title: 'Remove todo',
    message:
      'Are you sure you want to remove this todo?\n\nAll tasks associated with it will also be removed.',
    buttons: [
      {
        label: 'Cancel',
        value: false,
        variant: 'basic',
      },
      {
        label: 'Confirm',
        value: true,
        color: 'warn',
        variant: 'raised',
      },
    ],
  },
};
