import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  output,
  ViewChild,
} from '@angular/core';
import type { ITaskForm } from '../../services';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TaskFieldsComponent } from '../ui/task-field/task-fields.component';

@Component({
  imports: [ReactiveFormsModule, TaskFieldsComponent],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly task = input.required<FormGroup<ITaskForm>>();
  readonly removeTask = output<void>();

  readonly editing = signal(false);

  @ViewChild(TaskFieldsComponent)
  private readonly taskFields!: TaskFieldsComponent;

  get id(): number {
    return this.task().controls.id.value;
  }

  get title(): string {
    return this.task().controls.title.value;
  }

  get description(): string {
    return this.task().controls.description.value;
  }

  get completed(): boolean {
    return this.task().controls.completed.value;
  }

  get completedControl(): FormControl<boolean> {
    return this.task().controls.completed;
  }

  get titleControl(): FormControl<string> {
    return this.task().controls.title;
  }

  get descriptionControl(): FormControl<string> {
    return this.task().controls.description;
  }

  edit(): void {
    this.editing.set(true);
  }

  onSave(): void {
    if (this.task().invalid) {
      this.task().markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }

    this.editing.set(false);
  }
}
