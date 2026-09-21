import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  Injector,
  DestroyRef,
} from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ITask } from '../../models';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import {
  ResourceChangeNotifierManagerService,
  TaskManagerService,
} from '../../services';
import {
  TaskLoadingDirective,
  ScrollOnLoadingDirective,
} from '../../directives';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { LoaderManagerService } from '@org/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService, withToaster } from '@org/my-lib/operators';
import { TASK_SUCCESS_MESSAGES } from '../../types';
import { ABSTRACTION_TOKEN } from '../../tokens';

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
    { provide: ABSTRACTION_TOKEN, useClass: TaskManagerService },
  ],
})
export class TaskListComponent {
  readonly todoId = input.required<string>();
  readonly tasks = input.required<ITask[]>();

  readonly toaster = inject(ToasterService);
  readonly loader = inject(LOADER_MANAGER_SERVICE);

  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);
  readonly #takManager = inject(ABSTRACTION_TOKEN);
  readonly #notificationManager = inject(ResourceChangeNotifierManagerService);

  createTask(name: string): void {
    this.#takManager
      .create(
        { name },
        { params: { id: this.todoId() }, injector: this.#injector },
      )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.#notificationManager.refresh();
      });
  }

  removeTask(id: string, injector: Injector): void {
    this.#takManager
      .delete({
        params: { id: this.todoId(), 'task-id': id },
        injector,
      })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.DELETE),
      )
      .subscribe(() => {
        this.#notificationManager.refresh();
      });
  }

  updateTask(
    id: string,
    name: string,
    completed: boolean,
    injector: Injector,
  ): void {
    this.#takManager
      .update?.(
        { name, completed },
        { params: { id: this.todoId(), 'task-id': id }, injector },
      )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.UPDATE),
      )
      .subscribe(() => {
        this.#notificationManager.refresh();
      });
  }
}
