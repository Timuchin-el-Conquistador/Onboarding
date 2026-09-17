import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  Injector,
  ElementRef,
  ViewChild,
  effect,
  DestroyRef,
  Renderer2,
} from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ITask } from '../../models';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskManagerService, TodoManagerService } from '../../services';
import { TaskLoadingDirective } from '../../directives';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { LoaderManagerService } from '@org/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENDPOINTS_CONFIG } from '../../config';
import { ToasterService } from '@org/my-lib/services';
import { withToaster } from '@org/my-lib/operators';
import { TASK_SUCCESS_MESSAGES } from '../../types';

@Component({
  imports: [
    TaskItemComponent,
    EmptyStateComponent,
    TodoFormComponent,
    TaskLoadingDirective,
  ],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TaskListComponent {
  readonly todoId = input.required<string>();
  readonly tasks = input.required<ITask[]>();

  readonly loadingManagerService = inject(LOADER_MANAGER_SERVICE);
  readonly toasterService = inject(ToasterService);

  @ViewChild('skeleton', { read: ElementRef })
  skeleton?: ElementRef<HTMLElement>;

  readonly #renderer = inject(Renderer2);
  constructor() {
    effect(() => {
      if (!this.loadingManagerService.loading()) {
        return;
      }

      if (!this.skeleton) {
        return;
      }

      this.#renderer.addClass(
        this.skeleton.nativeElement,
        'tasks__skeleton--display',
      );

      this.skeleton.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    });
  }
  readonly #injector = inject(Injector);
  readonly #taskManager = inject(TaskManagerService);
  readonly #todoManager = inject(TodoManagerService);
  readonly #destroyRef = inject(DestroyRef);

  createTask(name: string): void {
    this.#taskManager
      .create(
        ENDPOINTS_CONFIG.CREATE_TASK,
        { name },
        { params: { id: this.todoId() }, injector: this.#injector },
      )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toasterService, TASK_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.#todoManager.refreshTodos();
      });
  }

  removeTask(id: string, injector: Injector): void {
    this.#taskManager
      .delete(ENDPOINTS_CONFIG.DELETE_TASK, {
        params: { id: this.todoId(), 'task-id': id },
        injector,
      })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toasterService, TASK_SUCCESS_MESSAGES.DELETE),
      )
      .subscribe(() => this.#todoManager.refreshTodos());
  }

  toggleTaskCompletion(
    id: string,
    name: string,
    completed: boolean,
    injector: Injector,
  ): void {
    this.#taskManager
      .update(
        ENDPOINTS_CONFIG.EDIT_TASK,
        { name, completed },
        { params: { id: this.todoId(), 'task-id': id }, injector },
      )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toasterService, TASK_SUCCESS_MESSAGES.UPDATE),
      )
      .subscribe(() => this.#todoManager.refreshTodos());
  }

  completeTaskEdit(id: string, name: string, injector: Injector): void {
    this.#taskManager
      .update(
        ENDPOINTS_CONFIG.EDIT_TASK,
        { name },
        { params: { id: this.todoId(), 'task-id': id }, injector },
      )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toasterService, TASK_SUCCESS_MESSAGES.UPDATE),
      )
      .subscribe(() => this.#todoManager.refreshTodos());
  }
}
