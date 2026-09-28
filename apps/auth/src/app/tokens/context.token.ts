import { HttpContextToken } from '@angular/common/http';
import { AuthAction } from '../types';

export const AUTH_ACTION = new HttpContextToken<AuthAction>(
  () => AuthAction.None,
);
