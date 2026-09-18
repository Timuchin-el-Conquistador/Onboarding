import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Injector,
  DestroyRef,
  AfterViewInit,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CONFIRM_MODAL_CONFIG } from '../../config';
import { withToaster } from '@org/my-lib/operators';
import { TODO_SUCCESS_MESSAGES } from '../../types';
import { ITodo } from '../../models';
import { filter, switchMap } from 'rxjs';
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
export class TodoListComponent
  extends TodoManagerService<ITodo>
  implements AfterViewInit
{
  readonly #confirmDialogManager = inject(ConfirmDialogManagerService);
  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.refresh(true);
  }

  createTodo(name: string): void {
    this.create({ name }, { injector: this.#injector })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TODO_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.refresh();
      });
  }

  confirmTodoRemoval(id: string, injector: Injector): void {
    this.#confirmDialogManager.open(CONFIRM_MODAL_CONFIG);

    this.#confirmDialogManager
      .confirmed()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((confirmed) => confirmed),
        switchMap(() =>
          this.delete({ params: { id }, injector }).pipe(
            withToaster(this.toaster, TODO_SUCCESS_MESSAGES.DELETE),
          ),
        ),
      )
      .subscribe(() => this.refresh());
  }
}
