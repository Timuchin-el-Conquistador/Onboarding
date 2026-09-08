import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import type { ITask, ITaskForm } from '../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskManagerService } from '../../services';
import { DynamicFormFactory, withLoading } from '@org/my-lib/interceptors';
import { requiredTrimmed } from '../../validators';

@Component({
  imports: [ReactiveFormsModule, TodoFormComponent],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  readonly todoId = input.required<string>();
  readonly task = input.required<ITask>();

  readonly editing = signal(false);
  readonly loading = signal(false);

  readonly id = computed<string>(() => this.task().id);
  readonly name = computed<string>(() => this.task().name);
  readonly completed = computed<boolean>(() => this.task().completed);

  taskForm!: FormGroup<ITaskForm>;

  readonly #formFactory = inject(DynamicFormFactory);
  readonly #taskManager = inject(TaskManagerService);

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
      .removeTask(this.todoId(), this.id())
      .pipe(withLoading(this.loading))
      .subscribe();
  }

  toggleTaskCompletion(completed: boolean): void {
    this.#taskManager
      .updateTask({ name: this.name(), completed }, this.todoId(), this.id())
      .pipe(withLoading(this.loading))
      .subscribe();
  }

  beginTaskEdit(): void {
    this.editing.set(true);
  }

  completeTaskEdit(name: string): void {
    this.#taskManager
      .updateTask({ name }, this.todoId(), this.id())
      .pipe(withLoading(this.loading))
      .subscribe(() => {
        this.editing.set(false);
      });
  }
}
