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
import { DYNAMIC_FORM_FACTORY } from '@org/my-lib/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  imports: [ReactiveFormsModule, FormFieldsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  readonly shouldResetOnSave = input(true);
  readonly submitLabel = input.required<string>();
  readonly form = input<FormGroup<ITaskForm>>(
    inject(DYNAMIC_FORM_FACTORY).createForm({
      fields: [
        {
          name: 'title',
          type: 'custom',
          isCollection: false,
          defaultValue: '',
          children: [],
          validators: {
            required: true,
          },
        },
      ],
    }),
  );
  readonly save = output<string>();

  @ViewChild(FormFieldsComponent)
  private taskFields!: FormFieldsComponent;

  onSave(): void {
    const form = this.form();
    const { title } = form.getRawValue();

    if (!title.trim()) {
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

    this.taskFields.blur();

    this.save.emit(title.trim());

    if (!this.shouldResetOnSave()) {
      return;
    }

    form.reset();
  }
}
