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
export class TaskListComponent extends TaskManagerService<ITodo> {
  readonly todoId = input.required<string>();
  readonly tasks = input.required<ITask[]>();

  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);

  createTask(name: string): void {
    this.create(
      { name },
      { params: { id: this.todoId() }, injector: this.#injector },
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.refresh();
      });
  }

  removeTask(id: string, injector: Injector): void {
    this.delete({
      params: { id: this.todoId(), 'task-id': id },
      injector,
    })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.DELETE),
      )
      .subscribe(() => {
        this.refresh();
      });
  }

  updateTask(id: string, name: string, completed: boolean, injector: Injector): void {
    this.update(
      { name, completed },
      { params: { id: this.todoId(), 'task-id': id }, injector },
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TASK_SUCCESS_MESSAGES.UPDATE),
      )
      .subscribe(() => {
        this.refresh();
      });
  }
}
