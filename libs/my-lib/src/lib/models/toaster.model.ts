export interface IToaster {
  success: (message: string, duration?: number, action?: string) => void;
  error: (message: string, duration?: number, action?: string) => void;
}
