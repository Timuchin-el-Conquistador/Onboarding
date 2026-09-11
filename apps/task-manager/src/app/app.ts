import {
  Component,
  inject,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { TodoManagerService } from './services';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  readonly #todoManager = inject(TodoManagerService);

  ngAfterViewInit(): void {
    this.#todoManager.refreshTodos(true);
  }
}
