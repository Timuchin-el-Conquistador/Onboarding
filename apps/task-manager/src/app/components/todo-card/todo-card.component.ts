import {
  Component,
  input,
  ChangeDetectionStrategy,
  computed,
  output,
  inject,
  Injector,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { ITodo } from '../../models';
import { LoaderManagerService } from '@org/shared/services';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { TaskListComponent } from '../task-list/task-list.component';
import { TodoLoadingDirective } from '../../directives';
import { TodoSummaryComponent } from '../todo-summary/todo-summary.component';
import { IconComponent } from '../ui/icon/icon.component';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';

@Component({
  imports: [
    ReactiveFormsModule,
    TaskListComponent,
    TodoLoadingDirective,
    TodoSummaryComponent,
    IconComponent,
    IconButtonComponent,
  ],
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TodoCardComponent {
  readonly todo = input.required<ITodo>();
  readonly removeTodo = output<Injector>();

  readonly id = computed(() => this.todo().id);
  readonly name = computed(() => this.todo().name);
  readonly tasks = computed(() => this.todo().tasks);

  readonly #injector = inject(Injector);

  incompleteTasksCount(): number {
    return this.tasks().filter((task) => !task.completed).length;
  }

  isTodoCompleted(): boolean {
    return (
      this.tasks().length > 0 && this.tasks().every((task) => task.completed)
    );
  }

  remove(): void {
    this.removeTodo.emit(this.#injector);
  }
}
