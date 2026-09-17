import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTruncation',
})
export class TextTruncationPipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength: number = 15): string {
    if (!value) {
      return '';
    }

    if (value.length <= maxLength) {
      return value;
    }

    return `${value.slice(0, maxLength - 3)}...`;
  }
}
