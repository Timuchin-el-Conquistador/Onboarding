import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Injector,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { BaseResourceManagerService, TodoManagerService } from '../../services';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { AsyncPipe } from '@angular/common';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import {
  TodoLoadingDirective,
  ScrollOnLoadingDirective,
} from '../../directives';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { ResourceCoordinatorManagerService } from '../../services/resource-coordinator-manager.service';
import { ITodoResponse } from '../../models';
import { APP_EVENTS, CONFIRM_MODAL_CONFIG } from '../../config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { withToaster } from '@org/my-lib/interceptors';
import { TODO_SUCCESS_MESSAGES } from '../../types';
import {
  BaseEventManagerService,
  ConfirmDialogManagerService,
} from '@org/shared';
import { withDispatchEvent } from '../../operators';

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
  providers: [
    {
      provide: BaseResourceManagerService,
      useExisting: TodoManagerService,
    },
  ],
})
export class TodoListComponent<T extends ITodoResponse>
  extends ResourceCoordinatorManagerService<T>
  implements AfterViewInit
{
  readonly dialog = inject(ConfirmDialogManagerService);

  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);
  readonly #eventManager = inject(BaseEventManagerService);
  ngAfterViewInit(): void {
    this.getAll(true);
  }

  createTodo(name: string): void {
    this.create(
      { name },
      this.createRequestConfig({ injector: this.#injector }),
    )
      .pipe(
        withToaster(this.toaster, TODO_SUCCESS_MESSAGES.CREATE),
        withDispatchEvent(this.#eventManager, APP_EVENTS.CREATE_TODO),
        takeUntilDestroyed(this.#destroyRef),
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
        filter((confirmed) => confirmed),
        switchMap(() =>
          this.delete(
            this.createRequestConfig({ params: { id }, injector }),
          ).pipe(
            withToaster(this.toaster, TODO_SUCCESS_MESSAGES.DELETE),
            withDispatchEvent(this.#eventManager, APP_EVENTS.DELETE_TODO, id, {
              id,
            }),
          ),
        ),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(() => {
        this.getAll();
      });
  }
}
