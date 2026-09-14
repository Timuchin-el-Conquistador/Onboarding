import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  Injector,
  ElementRef,
  ViewChild,
  effect,
  Renderer2,
} from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../models';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskManagerService, TodoManagerService } from '../../services';
import { TaskLoadingDirective } from '../../directives';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { LoaderManagerService } from '@org/shared/services';

@Component({
  imports: [
    TaskItemComponent,
    ReactiveFormsModule,
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

  @ViewChild('skeleton', { read: ElementRef })
  skeleton?: ElementRef<HTMLElement>;

  readonly #renderer = inject(Renderer2);
  readonly #injector = inject(Injector);
  readonly #taskManager = inject(TaskManagerService);
  readonly #todoManager = inject(TodoManagerService);

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
        block: 'end',
        inline: 'end',
      });
    });
  }

  createTask(title: string): void {
    this.#taskManager
      .createTask(this.todoId(), title, this.#injector)
      .subscribe(() => this.#todoManager.refreshTodos());
  }
}
