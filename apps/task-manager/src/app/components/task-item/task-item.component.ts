import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import type { ITaskForm, ITodo } from '../../models';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoFormManagerService, TaskManagerService } from '../../services';
import { withLoading } from '@org/my-lib/interceptors';

@Component({
  imports: [ReactiveFormsModule, TodoFormComponent],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly todoId = input.required<string>();
  readonly taskForm = input.required<FormGroup<ITaskForm>>();

  readonly editing = signal(false);
  readonly loading = signal(false);

  readonly #taskManager = inject(TaskManagerService);
  readonly #todoFormManager = inject(TodoFormManagerService);

  removeTask(): void {
    this.#taskManager
      .removeTask(this.todoId(), this.taskForm().controls.id.value)
      .pipe(withLoading(this.loading))
      .subscribe((todo: ITodo) => {
        this.#todoFormManager.setTasks(this.todoId(), todo.tasks);
      });
  }

  toggleTaskCompletion(completed: boolean): void {
    this.#taskManager
      .updateTask(
        { name: this.taskForm().controls.name.value, completed },
        this.todoId(),
        this.taskForm().controls.id.value,
      )
      .pipe(withLoading(this.loading))
      .subscribe((todo: ITodo) => {
        this.editing.set(false);
        this.#todoFormManager.setTasks(this.todoId(), todo.tasks);
      });
  }

  beginTaskEdit(): void {
    this.editing.set(true);
  }

  completeTaskEdit(name: string): void {
    this.#taskManager
      .updateTask({ name }, this.todoId(), this.taskForm().controls.id.value)
      .pipe(withLoading(this.loading))
      .subscribe((todo: ITodo) => {
        this.editing.set(false);
        this.#todoFormManager.setTasks(this.todoId(), todo.tasks);
      });
  }
}
