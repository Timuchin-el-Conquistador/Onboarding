import { InjectionToken } from '@angular/core'

export const API_URL_TOKEN = new InjectionToken('API_URL_TOKEN')
export const T_AUTH_HEADER = new InjectionToken<string>('T_AUTH_HEADER', {
  factory: () => 'T-Auth',
});