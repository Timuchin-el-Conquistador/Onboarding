import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaskingInputPipe } from '../../pipes';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MaskingInputPipe,
  ],
  templateUrl: './password-field.component.html',
  styleUrls: ['../../auth-shared.scss', './password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: PasswordFieldComponent },
  ],
})
export class PasswordFieldComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy
{
  @Input()
  get required() {
    return this.#_required;
  }
  @Input()
  get disabled(): boolean {
    return this.#_disabled;
  }

  @Input()
  get placeholder() {
    return this.#_placeholder;
  }

  isMasked = true;
  realPassword = '';
  focused = false;
  stateChanges = new Subject<void>();
  controlType = 'app-password-field';

  #selectionStart = 0;
  #selectionEnd = 0;
  #_placeholder: string = '';
  #_required = false;
  #_disabled = false;

  static nextId = 0;

  @HostBinding() id = `${PasswordFieldComponent.nextId++}`;

  @HostBinding('attr.aria-describedby') describedBy = '';

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  get empty(): boolean {
    return !this.realPassword;
  }

  get errorState(): boolean {
    return (
      !!this.ngControl?.invalid &&
      !!(this.ngControl?.touched || this.ngControl?.dirty)
    );
  }

  get value(): string {
    return this.realPassword;
  }

  set required(req) {
    this.#_required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  set placeholder(plh) {
    this.#_placeholder = plh;
    this.stateChanges.next();
  }

  set value(val: string | null) {
    this.realPassword = val ?? '';
    this.stateChanges.next();
  }
  
  set disabled(value: boolean) {
    this.#_disabled = coerceBooleanProperty(value);

    const input = this.elRef.nativeElement.querySelector('input');

    if (input) {
      input.disabled = this.#_disabled;
    }

    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input')?.focus();
    }
  }

  onChange(value: string) {}

  onTouch() {}

  writeValue(value: string | null): void {
    this.realPassword = value ?? '';
    this.stateChanges.next();
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onBeforeInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    this.#selectionStart = input.selectionStart ?? 0;
    this.#selectionEnd = input.selectionEnd ?? 0;
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
      this.stateChanges.next();
      return;
    }

    const inputEvent = event as InputEvent;
    if (inputEvent.inputType === 'deleteContentBackward') {
      const deleteStart =
        this.#selectionStart === this.#selectionEnd
          ? this.#selectionStart - 1
          : this.#selectionStart;

      this.realPassword =
        this.realPassword.slice(0, deleteStart) +
        this.realPassword.slice(this.#selectionEnd);
    } else {
      const newChar = value[this.#selectionStart];

      this.realPassword =
        this.realPassword.slice(0, this.#selectionStart) +
        newChar +
        this.realPassword.slice(this.#selectionEnd);
    }

    this.onChange(this.realPassword);

    const selectionStart = inputElement.selectionStart;
    requestAnimationFrame(() => {
      inputElement.setSelectionRange(selectionStart, selectionStart);
    });
  }
}
