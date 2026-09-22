import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  Injector,
  DestroyRef,
} from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ITask, ITodo } from '../../models';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskManagerService } from '../../services';
import {
  TaskLoadingDirective,
  ScrollOnLoadingDirective,
} from '../../directives';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { LoaderManagerService } from '@org/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withToaster } from '@org/my-lib/operators';
import { TASK_SUCCESS_MESSAGES } from '../../types';
import { ResourceCoordinatorManagerService } from '../../services/resource-coordinator-manager.service';

@Component({
  imports: [
    TaskItemComponent,
    EmptyStateComponent,
    TodoFormComponent,
    TaskLoadingDirective,
    ScrollOnLoadingDirective,
  ],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TaskListComponent<
  T extends ITodo,
> extends ResourceCoordinatorManagerService<T> {
  readonly todoId = input.required<string>();
  readonly tasks = input.required<ITask[]>();

  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    super(inject(TaskManagerService));
  }

  createTask(name: string): void {
    this.create(
      { name },
      this.createRequestConfig({
        params: { id: this.todoId() },
        injector: this.#injector,
      }),
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.getAll();
      });
  }

  removeTask(id: string, injector: Injector): void {
    this.delete(
      this.createRequestConfig({
        params: { id: this.todoId(), 'task-id': id },
        injector,
      }),
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.DELETE),
      )
      .subscribe(() => {
        this.getAll();
      });
  }

  updateTask(
    id: string,
    name: string,
    completed: boolean,
    injector: Injector,
  ): void {
    this.update(
      { name, completed },
      this.createRequestConfig({
        params: { id: this.todoId(), 'task-id': id },
        injector,
      }),
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.UPDATE),
      )
      .subscribe(() => {
        this.getAll();
      });
  }
}
