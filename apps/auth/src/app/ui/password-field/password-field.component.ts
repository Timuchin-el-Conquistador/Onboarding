import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      useExisting: PasswordFieldComponent,
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

  private selectionStart = 0;
  private selectionEnd = 0;

  onBeforeInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    this.selectionStart = input.selectionStart ?? 0;
    this.selectionEnd = input.selectionEnd ?? 0;
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(obj: any): void {
    this.realPassword = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleVisibility(): void {
    this.isMasked = !this.isMasked;
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (!this.isMasked) {
      this.realPassword = value;
      this.onChange(this.realPassword);
      return;
    }

    const inputEvent = event as InputEvent;
    if (inputEvent.inputType === 'deleteContentBackward') {
      const deleteStart =
        this.selectionStart === this.selectionEnd
          ? this.selectionStart - 1
          : this.selectionStart;

      this.realPassword =
        this.realPassword.slice(0, deleteStart) +
        this.realPassword.slice(this.selectionEnd);
    } else {
      const newChar = value[this.selectionStart];

      this.realPassword =
        this.realPassword.slice(0, this.selectionStart) +
        newChar +
        this.realPassword.slice(this.selectionEnd);
    }

    this.onChange(this.realPassword);

    const selectionStart = inputElement.selectionStart;
    requestAnimationFrame(() => {
      inputElement.setSelectionRange(selectionStart, selectionStart);
    });
  }
}
