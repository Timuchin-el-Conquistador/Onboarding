import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  OnInit,
  Injector,
} from '@angular/core';
import type { ITask, ITaskForm } from '../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskManagerService, TodoManagerService } from '../../services';
import { DynamicFormFactory } from '@org/shared/forms';
import { LoaderManagerService } from '@org/shared/services';
import { requiredTrimmed } from '../../validators';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { TaskLoadingDirective } from '../../directives';

@Component({
  imports: [ReactiveFormsModule, TodoFormComponent, TaskLoadingDirective],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TaskItemComponent implements OnInit {
  readonly todoId = input.required<string>();
  readonly task = input.required<ITask>();

  readonly id = computed<string>(() => this.task().id);
  readonly name = computed<string>(() => this.task().name);
  readonly completed = computed<boolean>(() => this.task().completed);

  readonly editing = signal(false);

  taskForm!: FormGroup<ITaskForm>;

  readonly #injector = inject(Injector);
  readonly #formFactory = inject(DynamicFormFactory);
  readonly #taskManager = inject(TaskManagerService);
  readonly #todoManager = inject(TodoManagerService);

  ngOnInit(): void {
    this.taskForm = this.#formFactory.createForm<ITaskForm>({
      fields: [
        {
          name: 'name',
          type: 'custom',
          defaultValue: this.name(),
          isCollection: false,
          fields: [],
          validators: {
            required: true,
            custom: [requiredTrimmed()],
          },
        },
      ],
    });
  }

  removeTask(): void {
    this.#taskManager
      .removeTask(this.todoId(), this.id(), this.#injector)
      .subscribe(() => this.#todoManager.refreshTodos());
  }

  toggleTaskCompletion(completed: boolean): void {
    this.#taskManager
      .updateTask(
        { name: this.name(), completed },
        this.todoId(),
        this.id(),
        this.#injector,
      )
      .subscribe(() => this.#todoManager.refreshTodos());
  }

  beginTaskEdit(): void {
    this.editing.set(true);
  }

  completeTaskEdit(name: string): void {
    this.#taskManager
      .updateTask({ name }, this.todoId(), this.id(), this.#injector)
      .subscribe(() => {
        this.#todoManager.refreshTodos();
        this.editing.set(false);
      });
  }
}
