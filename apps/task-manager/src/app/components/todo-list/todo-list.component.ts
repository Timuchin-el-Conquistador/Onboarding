import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  effect,
  Injector,
  DestroyRef,
  Renderer2,
} from '@angular/core';
import { TodoManagerService } from '../../services';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { AsyncPipe } from '@angular/common';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoLoadingDirective } from '../../directives';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialogManagerService } from '@org/shared/services';
import { BASE_ENDPOINT, CONFIRM_MODAL_CONFIG } from '../../config';
import { ToasterService } from '@org/my-lib/services';
import { withToaster } from '@org/my-lib/operators';
import { TODO_SUCCESS_MESSAGES } from '../../types';

@Component({
  imports: [
    TodoCardComponent,
    AsyncPipe,
    EmptyStateComponent,
    TodoLoadingDirective,
    TodoFormComponent,
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly loadingManagerService = inject(LOADER_MANAGER_SERVICE);
  readonly toasterService = inject(ToasterService);

  readonly todos$ = inject(TodoManagerService).todos$;

  @ViewChild('skeleton', { read: ElementRef })
  skeleton?: ElementRef<HTMLElement>;

  readonly #renderer = inject(Renderer2);
  readonly #injector = inject(Injector);
  readonly #todoManager = inject(TodoManagerService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #confirmDialogManager = inject(ConfirmDialogManagerService);

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
        'todo-app__skeleton--display',
      );

      this.skeleton.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    });
  }

  createTodo(name: string): void {
    this.#todoManager
      .create(BASE_ENDPOINT, { name }, { injector: this.#injector })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toasterService, TODO_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.#todoManager.refreshTodos();
      });
  }

  confirmTodoRemoval(todoId: string, injector: Injector): void {
    this.#confirmDialogManager.open(CONFIRM_MODAL_CONFIG);

    this.#confirmDialogManager
      .confirmed()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((confirmed) => this.#removeTodo(todoId, confirmed, injector));
  }

  #removeTodo(id: string, confirmed: boolean, injector: Injector): void {
    if (confirmed) {
      this.#todoManager
        .delete(BASE_ENDPOINT, { params: { id }, injector })
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          withToaster(this.toasterService, TODO_SUCCESS_MESSAGES.DELETE),
        )
        .subscribe(() => this.#todoManager.refreshTodos());
    }
  }
}
