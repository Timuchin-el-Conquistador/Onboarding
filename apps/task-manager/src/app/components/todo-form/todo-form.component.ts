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
import type { ITaskForm, ITodoForm } from '../../models';
import { DYNAMIC_FORM_FACTORY } from '@org/shared/forms';
import { requiredTrimmed } from '../../validators';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  imports: [ReactiveFormsModule, FormFieldsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  readonly submitLabel = input.required<string>();
  readonly loading = input<boolean>();
  readonly shouldResetOnSave = input<boolean>(true);
  readonly form = input<FormGroup<ITaskForm | ITodoForm>>(
    inject(DYNAMIC_FORM_FACTORY).createForm<ITodoForm>({
      fields: [
        {
          name: 'name',
          type: 'custom',
          isCollection: false,
          defaultValue: '',
          fields: [],
          validators: {
            required: true,
            custom: [requiredTrimmed()],
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
    const { name } = form.getRawValue();

    if (form.invalid) {
      form.markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    this.taskFields.blur();

    this.save.emit(name.trim());

    if (this.shouldResetOnSave()) {
      form.reset();
    }
  }
}
