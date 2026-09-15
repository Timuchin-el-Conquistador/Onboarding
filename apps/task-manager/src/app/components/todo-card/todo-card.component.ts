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
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  imports: [
    ReactiveFormsModule,
    TaskListComponent,
    TodoLoadingDirective,
    TodoSummaryComponent,
    IconComponent,
    ButtonComponent,
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
  readonly incompleteTasksCount = computed(
    () => this.tasks().filter((task) => !task.completed).length,
  );
  readonly isTodoCompleted = computed(
    () =>
      this.tasks().length > 0 && this.tasks().every((task) => task.completed),
  );

  readonly #injector = inject(Injector);

  remove(): void {
    this.removeTodo.emit(this.#injector);
  }
}
