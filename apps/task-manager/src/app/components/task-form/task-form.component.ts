import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormManagerService } from '../../services';
import { TaskFieldsComponent } from '../ui/task-field/task-fields.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [ReactiveFormsModule, TaskFieldsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  readonly #todoFormManager = inject(TodoFormManagerService);

  readonly form = this.#todoFormManager.form;

  @ViewChild(TaskFieldsComponent)
  private taskFields!: TaskFieldsComponent;

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    const { title, description } = this.form.getRawValue();

    this.#todoFormManager.createTask(title, description);

    this.form.reset();
  }
}
