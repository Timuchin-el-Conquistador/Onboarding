import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
  output,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldsComponent } from '../ui/form-fields/form-fields.component';
import { DYNAMIC_FORM_FACTORY } from '@org/my-lib/forms';
import type { ITodoForm } from '../../models';
import { DEFAULT_TODO_FORM } from '../../mocks';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  imports: [ReactiveFormsModule, FormFieldsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  readonly submitLabel = input.required<string>();
  readonly save = output<string>();

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<ITodoForm>(DEFAULT_TODO_FORM);

  @ViewChild(FormFieldsComponent)
  private taskFields!: FormFieldsComponent;

  onSave(): void {
    const { title } = this.form.getRawValue();

    if (!title.trim()) {
      this.form.controls.title.setErrors({ required: true });
      this.form.controls.title.markAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    this.save.emit(title);

    this.form.reset();
  }
}
