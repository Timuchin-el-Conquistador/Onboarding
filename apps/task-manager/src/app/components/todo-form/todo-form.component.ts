import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  output,
  input,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldsComponent } from '../ui/form-fields/form-fields.component';
import type { ITaskForm } from '../../models';
import { DEFAULT_TODO_FORM } from '../../mocks';
import { DYNAMIC_FORM_FACTORY } from '@org/my-lib/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  imports: [ReactiveFormsModule, FormFieldsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  readonly resetOnSave = input(true);
  readonly submitLabel = input.required<string>();
  readonly form = input<FormGroup<ITaskForm>>(
    inject(DYNAMIC_FORM_FACTORY).createForm<ITaskForm>(DEFAULT_TODO_FORM),
  );
  readonly save = output<string>();

  @ViewChild(FormFieldsComponent)
  private taskFields!: FormFieldsComponent;

  onSave(): void {
    const form = this.form();

    const { title } = form.getRawValue();
    const trimmed = title.trim();

    if (!trimmed) {
      form.controls.title.setErrors({ required: true });
      form.controls.title.markAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    if (form.invalid) {
      form.markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    form.controls.title.setValue(trimmed);

    this.taskFields.blur();

    this.save.emit(trimmed);

    if (!this.resetOnSave()) {
      return;
    }

    form.reset();
  }
}
