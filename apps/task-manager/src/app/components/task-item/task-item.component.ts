import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  output,
} from '@angular/core';
import type { ITaskForm } from '../../models';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  imports: [ReactiveFormsModule, TodoFormComponent],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly task = input.required<FormGroup<ITaskForm>>();
  readonly removeTask = output<void>();
  readonly editing = signal(false);

  get id(): number {
    return this.task().controls.id.value;
  }

  get title(): string {
    return this.task().controls.title.value ?? '';
  }

  get completed(): boolean {
    return this.task().controls.completed.value ?? false;
  }

  edit(): void {
    this.editing.set(true);
  }

  onSave(): void {
    this.editing.set(false);
  }
}
