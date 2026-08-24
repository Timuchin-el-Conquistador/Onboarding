import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ViewChild,
  Component,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaskingInputPipe } from '../../pipes/masking';

@Component({
  selector: 'app-password-field',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MaskingInputPipe,
  ],
  templateUrl: './password-field.component.html',
  styleUrls: ['../../auth-shared.scss', './password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent {
  value = '';
  isMasked = true;

  private selectionStart = 0;
  private selectionEnd = 0;

  @ViewChild('maskInput', { static: false })
  maskInputRef!: ElementRef<HTMLInputElement>;

  toggleVisibility(): void {
    this.isMasked = !this.isMasked;
  }

  onKeyDown(): void {
    const input = this.maskInputRef.nativeElement;
    this.selectionStart = input.selectionStart ?? 0;
    this.selectionEnd = input.selectionEnd ?? this.selectionStart;
  }

  changeValue(value: string): void {
    const input = this.maskInputRef.nativeElement;
    const cursorPosition = input.selectionStart ?? this.selectionStart;

    if (!this.isMasked) {
      this.value = value;
      return;
    }

    if (value.length > this.value.length) {
      const addedChars = value.replace(/\*/g, '');
      const position = cursorPosition - addedChars.length;

      this.value =
        this.value.substring(0, position) +
        addedChars +
        this.value.substring(position);
    } else if (value.length < this.value.length) {
      const start = this.selectionStart;
      const end = this.selectionEnd;

      if (start !== end) {
        this.value = this.value.substring(0, start) + this.value.substring(end);
      } else {
        const position = cursorPosition;

        this.value =
          this.value.substring(0, position) +
          this.value.substring(position + 1);
      }
    }
    setTimeout(() => {
      input.setSelectionRange(cursorPosition, cursorPosition);
    });
  }
}
