import { Pipe, PipeTransform } from '@angular/core';
import { ALPHA_NUMERIC } from '../models/regexp';

@Pipe({
  name: 'maskRange',
})
export class MaskingInputPipe implements PipeTransform {
  transform(
    value: string,
    start: number = 0,
    end: number = 0,
    maskChar: string = '*',
  ): string {
    const [prefix, toMask, suffix] = [
      value.slice(0, start),
      value.slice(start, end),
      value.slice(end),
    ];

    const maskedPart = toMask.replace(ALPHA_NUMERIC, maskChar);

    return prefix + maskedPart + suffix;
  }
}
