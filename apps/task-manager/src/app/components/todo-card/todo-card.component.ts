import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import {
  TodoFormManagerService,
  TodoManagerService,
  TaskManagerService,
} from '../../services';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';
import type { ITodo, ITodoForm } from '../../models';
import { withLoading } from '@org/my-lib/interceptors';
import { TaskLoadingComponent } from '../ui/loading/task/task-loading.component';

@Component({
  imports: [
    ReactiveFormsModule,
    TaskListComponent,
    TodoFormComponent,
    TodoActionsComponent,
    TaskLoadingComponent,
  ],
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  readonly todoForm = input.required<FormGroup<ITodoForm>>();

  readonly removingTodo = signal(false);
  readonly loadingTasks = signal(false);

  readonly #todoManager = inject(TodoManagerService);
  readonly #taskManager = inject(TaskManagerService);
  readonly #todoFormManager = inject(TodoFormManagerService);

  createTask(title: string): void {
    this.#taskManager
      .createTask(this.todoForm().controls.id.value, title)
      .pipe(withLoading(this.loadingTasks))
      .subscribe((todo: ITodo) => {
        this.#todoFormManager.setTasks(
          this.todoForm().controls.id.value,
          todo.tasks,
        );
      });
  }

  incompleteTasksCount(): number {
    const tasks = this.todoForm().controls.tasks;

    return tasks.controls.filter((task) => !task.controls.completed.value)
      .length;
  }

  isTodoCompleted(): boolean {
    const tasks = this.todoForm().controls.tasks;

    return (
      tasks.length > 0 &&
      tasks.controls.every((task) => task.controls.completed.value)
    );
  }

  removeTodo(): void {
    const confirmed = confirm(
      'Are you sure you want to delete this todo?\n\nThis will also delete all tasks associated with it.',
    );

    if (!confirmed) {
      return;
    }

    this.#todoManager
      .removeTodo(this.todoForm().controls.id.value)
      .pipe(withLoading(this.removingTodo))
      .subscribe(() => {
        this.#todoFormManager.removeTodo(this.todoForm().controls.id.value);
      });
  }
}
