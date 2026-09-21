import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Injector,
  DestroyRef,
  AfterViewInit,
} from '@angular/core';
import {
  TodoManagerService,
  ResourceChangeNotifierManagerService,
} from '../../services';
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
import { ToasterService } from '@org/my-lib/services';
import { TODO_SUCCESS_MESSAGES } from '../../types';
import { filter, switchMap } from 'rxjs';
import {
  ConfirmDialogManagerService,
  LOADER_MANAGER_SERVICE,
} from '@org/shared';
import { ABSTRACTION_TOKEN } from '../../tokens';

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
  providers: [{ provide: ABSTRACTION_TOKEN, useClass: TodoManagerService }],
})
export class TodoListComponent implements AfterViewInit {
  readonly toaster = inject(ToasterService);
  readonly loader = inject(LOADER_MANAGER_SERVICE);
  readonly todos$ = inject(ResourceChangeNotifierManagerService).todos$;

  readonly #confirmDialogManager = inject(ConfirmDialogManagerService);
  readonly #injector = inject(Injector);
  readonly #destroyRef = inject(DestroyRef);
  readonly #todoManager = inject(ABSTRACTION_TOKEN);
  readonly #notificationManager = inject(ResourceChangeNotifierManagerService);

  ngAfterViewInit(): void {
    this.#notificationManager.refresh(true);
  }

  createTodo(name: string): void {
    this.#todoManager
      .create({ name }, { injector: this.#injector })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withToaster(this.toaster, TODO_SUCCESS_MESSAGES.CREATE),
      )
      .subscribe(() => {
        this.#notificationManager.refresh();
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
          this.#todoManager
            .delete({ params: { id }, injector })
            .pipe(withToaster(this.toaster, TODO_SUCCESS_MESSAGES.DELETE)),
        ),
      )
      .subscribe(() => {
        this.#notificationManager.refresh();
      });
  }
}
