export interface IConfirmDialogDataConfig {
  title: string;
  message: string;
  buttons: IDialogButtonConfig[];
}

export interface IDialogButtonConfig {
  label: string;
  value: any;
  color?: 'primary' | 'accent' | 'warn';
  variant?: 'basic' | 'raised';
}
