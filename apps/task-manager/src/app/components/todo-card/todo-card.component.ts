import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { TodoManagerService, TaskManagerService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';
import type { ITodo } from '../../models';
import { withLoading } from '@org/shared/operators';
import {
  ConfirmDialogManagerService,
  LoaderManagerService,
} from '@org/shared/services';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { TaskListComponent } from '../task-list/task-list.component';
import { CONFIRM_MODAL_CONFIG } from '../../config';
import { TodoLoadingDirective } from '../../directives';

@Component({
  imports: [
    ReactiveFormsModule,
    TaskListComponent,
    TodoFormComponent,
    TodoActionsComponent,
    TodoLoadingDirective,
  ],
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TodoCardComponent {
  readonly todo = input.required<ITodo>();

  readonly id = computed(() => this.todo().id);
  readonly name = computed(() => this.todo().name);
  readonly tasks = computed(() => this.todo().tasks);

  readonly loaderManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly #todoManager = inject(TodoManagerService);
  readonly #taskManager = inject(TaskManagerService);
  readonly #confirmDialogManager = inject(ConfirmDialogManagerService);

  createTask(title: string): void {
    this.#taskManager
      .createTask(this.id(), title)
      .pipe(withLoading(this.loaderManagerService))
      .subscribe(() => this.#todoManager.refreshTodos());
  }

  incompleteTasksCount(): number {
    return this.tasks().filter((task) => !task.completed).length;
  }

  isTodoCompleted(): boolean {
    return (
      this.tasks().length > 0 && this.tasks().every((task) => task.completed)
    );
  }

  confirmTodoRemoval(): void {
    this.#confirmDialogManager.open(CONFIRM_MODAL_CONFIG);

    this.#confirmDialogManager
      .confirmed()
      .subscribe(this.#removeTodo.bind(this));
  }

  #removeTodo(confirmed: boolean): void {
    if (confirmed) {
      this.#todoManager
        .removeTodo(this.id())
        .pipe(withLoading(this.loaderManagerService))
        .subscribe(() => this.#todoManager.refreshTodos());
    }
  }
}
