import { DialogOptionsType } from '@org/shared/models';

export const CONFIRM_MODAL_CONFIG: DialogOptionsType = {
  title: 'Remove todo',
  message:
    'Are you sure you want to remove this todo?\n\nAll tasks associated with it will also be removed.',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
};
