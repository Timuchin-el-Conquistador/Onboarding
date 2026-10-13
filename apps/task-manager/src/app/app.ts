import {
  Component,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HistoryManagerService } from './services/history-manager.service';
import { WINDOW } from '@org/shared';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_EVENTS } from './config';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly #historyManager = inject(HistoryManagerService);
  readonly #window = inject(WINDOW);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent<MessageEvent>(this.#window, 'message')
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((event) => event.origin === this.#window.location.origin),
        filter(
          (event) =>
            event.data.event &&
            Object.keys(APP_EVENTS).includes(event.data.event),
        ),
      )
      .subscribe((e) => {
        const { event, todo_id, data } = e.data;
        this.#historyManager
          .create({
            event,
            todo_id,
            data,
          })
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe();
      });
  }
}
