import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaskingInputPipe } from '../../pipes/masking';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MaskingInputPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  PasswordFieldComponent,
      multi: true,
    },
  ],
  templateUrl: './password-field.component.html',
  styleUrls: ['../../auth-shared.scss', './password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements ControlValueAccessor {
  isMasked = true;
  realPassword = ''; 

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(obj: any): void {
    this.realPassword = obj || '';
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  toggleVisibility(): void {
    this.isMasked = !this.isMasked;
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (!this.isMasked) {
      this.realPassword = value;
    } else {
      let realIndex = 0;
      this.realPassword = value
        .split('')
        .map((char) => (char === '*' ? this.realPassword[realIndex++] : char))
        .join('');
    }

    this.onChange(this.realPassword);
  }

}
