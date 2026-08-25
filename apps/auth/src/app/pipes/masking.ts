import { Pipe, PipeTransform } from '@angular/core';
import { ALPHA_NUMERIC } from '../types/regexp';

@Pipe({ 
  name: 'mask',
})
export class MaskingInputPipe implements PipeTransform {
  transform(
    value: string | null | undefined, 
    start: number = 0, 
    end: number = 0, 
    maskChar:string = '*'
  ): string {
    if (!value) return '';

    const prefix = value.slice(0, start);
    const toMask = value.slice(start, end);
    const suffix = value.slice(end);

    const maskedPart = toMask.replace(ALPHA_NUMERIC, maskChar);

    return prefix + maskedPart + suffix;
  }
}
