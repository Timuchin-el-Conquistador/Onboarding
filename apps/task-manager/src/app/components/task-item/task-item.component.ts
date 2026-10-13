import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  OnInit,
  output,
  Injector,
} from '@angular/core';
import type { ITask, ITaskForm } from '../../models';
import { FormGroup } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { DynamicFormFactory } from '@org/shared/forms';
import { requiredTrimmed } from '../../validators';
import { TaskLoadingDirective } from '../../directives';
import { ButtonComponent } from '../ui/button/button.component';
import { IconComponent } from '../ui/icon/icon.component';
import { CheckboxComponent } from '../ui/checkbox/checkbox.component';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { LoaderManagerService } from '@org/shared/services';
import { TextTruncationPipe } from '../../pipes';

@Component({
  imports: [
    TodoFormComponent,
    ButtonComponent,
    IconComponent,
    CheckboxComponent,
    TaskLoadingDirective,
    TextTruncationPipe,
  ],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOADER_MANAGER_SERVICE, useClass: LoaderManagerService },
  ],
})
export class TaskItemComponent implements OnInit {
  readonly task = input.required<ITask>();
  readonly removeTask = output<{
    name: string;
    completed: boolean;
    injector: Injector;
  }>();
  readonly updateTask = output<{
    name: string;
    completed: boolean;
    injector: Injector;
  }>();

  readonly id = computed<string>(() => this.task().id);
  readonly name = computed<string>(() => this.task().name);
  readonly completed = computed<boolean>(() => this.task().completed);

  readonly editing = signal(false);

  taskForm!: FormGroup<ITaskForm>;

  readonly #injector = inject(Injector);
  readonly #formFactory = inject(DynamicFormFactory);

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

  remove(name: string, completed: boolean): void {
    this.updateTask.emit({
      name,
      completed,
      injector: this.#injector,
    });
  }

  startEdit(): void {
    this.editing.set(true);
  }

  completeEdit(name: string, completed: boolean): void {
    this.editing.set(false);
    this.updateTask.emit({
      name,
      completed,
      injector: this.#injector,
    });
  }
}
