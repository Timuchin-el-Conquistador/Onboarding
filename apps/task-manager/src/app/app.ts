import {
  Component,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HistoryManagerService } from './services/history-manager.service';
import { WINDOW } from '@org/shared';
import { filter, firstValueFrom, fromEvent, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_EVENTS } from './config';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #historyManager = inject(HistoryManagerService);
  readonly #window = inject(WINDOW);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent<MessageEvent>(this.#window, 'message')
      .pipe(
        filter((event) => event.origin === this.#window.location.origin),
        filter(
          (event) =>
            event.data.event &&
            Object.keys(APP_EVENTS).includes(event.data.event),
        ),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((e) => {
        const { event, todo_id, data } = e.data;

        firstValueFrom(
          this.#historyManager.create({
            event,
            todo_id,
            data,
          }),
        );
      });
  }
}
