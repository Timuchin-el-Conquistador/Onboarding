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

  edit(): void {
    this.editing.set(true);
  }

  onSave(title: string): void {
    this.task().controls.title.setValue(title);
    this.editing.set(false);
  }
}
