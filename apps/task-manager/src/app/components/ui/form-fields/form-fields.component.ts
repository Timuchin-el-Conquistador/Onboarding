import {
  ChangeDetectionStrategy,
  Component,
  input,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent {
  readonly controls = input.required<FormControl<string>[]>();

  @ViewChildren('field')
  private readonly inputs!: QueryList<ElementRef<HTMLElement>>;

  focusInvalid(): void {
    const controls = this.controls();
    const inputs = this.inputs.toArray();
    const invalidIndex = controls.findIndex((control) => control.invalid);

    if (invalidIndex !== -1) {
      inputs[invalidIndex]?.nativeElement.focus();
    }
  }
}
