import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Injector,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { TodoManagerService } from '../../services';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { AsyncPipe } from '@angular/common';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import {
  TodoLoadingDirective,
  ScrollOnLoadingDirective,
} from '../../directives';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { ResourceCoordinatorManagerService } from '../../services/resource-coordinator-manager.service';
import { ITodo } from '../../models';
import { CONFIRM_MODAL_CONFIG } from '../../config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { withToaster } from '@org/my-lib/interceptors';
import { TODO_SUCCESS_MESSAGES } from '../../types';
import { ConfirmDialogManagerService } from '@org/shared';

@Component({
  imports: [
    TodoCardComponent,
    AsyncPipe,
    EmptyStateComponent,
    TodoLoadingDirective,
    TodoFormComponent,
    ScrollOnLoadingDirective,
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent<T extends ITodo>
  extends ResourceCoordinatorManagerService<T>
  implements AfterViewInit
{
  readonly dialog = inject(ConfirmDialogManagerService);

  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    super(inject(TodoManagerService));
  }

  ngAfterViewInit(): void {
    this.getAll(true);
  }

  createTodo(name: string): void {
    this.create(
      { name },
      this.createRequestConfig({ injector: this.#injector }),
    )
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TODO_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.getAll();
      });
  }

  confirmTodoRemoval(id: string, injector: Injector): void {
    this.dialog.open(CONFIRM_MODAL_CONFIG);

    this.dialog
      .confirmed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((confirmed) => confirmed),
        switchMap(() =>
          this.delete(
            this.createRequestConfig({ params: { id }, injector }),
          ).pipe(withToaster(this.toaster, TODO_SUCCESS_MESSAGES.DELETE)),
        ),
      )
      .subscribe(() => {
        this.getAll();
      });
  }
}
