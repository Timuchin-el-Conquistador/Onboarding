import { Injectable, inject } from '@angular/core';
import type { ITask, IForm, ITodoForm } from '../models';
import {
  DYNAMIC_FORM_FACTORY,
  IFormFieldConfig,
  IFormSchemaConfig,
} from '@org/my-lib/operators';
import { DEFAULT_TODO_FORM } from '../mocks';
import { requiredTrimmed } from '../validators';

@Injectable({
  providedIn: 'root',
})
export class TodoFormManagerService {
  readonly #formFactory = inject(DYNAMIC_FORM_FACTORY);

  readonly form = this.#formFactory.createForm<IForm>(DEFAULT_TODO_FORM);

  createTodo(id: string, title: string, tasks: ITask[] = []): void {
    this.form.controls.todo.push(
      this.#formFactory.createForm<ITodoForm>(
        this.#createTodoSchema(id, title, tasks),
      ),
    );
  }

  setTasks(todoId: string, tasks: ITask[]): void {
    const index = this.#getTodoPositionIndexById(todoId);

    if (index === -1) {
      return;
    }

    const todos = this.form.controls.todo.at(index);

    todos.controls.tasks.clear();
    todos.controls.tasks.push(
      tasks.flatMap((task) =>
        this.#formFactory.createForm({ fields: this.#createTaskFields(task) }),
      ),
    );
  }

  removeTodo(id: string): void {
    const index = this.#getTodoPositionIndexById(id);

    if (index === -1) {
      return;
    }

    this.form.controls.todo.removeAt(index);
  }

  #getTodoPositionIndexById(id: string): number {
    return this.form.controls.todo.value.findIndex(
      (control) => control.id === id,
    );
  }

  #createTodoSchema(
    id: string,
    title: string,
    tasks: ITask[],
  ): IFormSchemaConfig {
    return {
      fields: [
        this.#createField('name', title),
        this.#createField('id', id),
        {
          name: 'tasks',
          type: 'custom',
          defaultValue: '',
          isCollection: true,
          fields: tasks.map((task) => this.#createTaskFields(task)),
        },
      ],
    };
  }

  #createTaskFields(task: ITask): IFormFieldConfig[] {
    return [
      this.#createField('id', task.id),
      this.#createField('name', task.name, {
        required: true,
        custom: [requiredTrimmed()],
      }),
      this.#createField('completed', task.completed),
    ];
  }

  #createField(
    name: string,
    defaultValue: unknown,
    validators?: IFormFieldConfig['validators'],
  ): IFormFieldConfig {
    return {
      name,
      type: 'custom',
      defaultValue,
      isCollection: false,
      fields: [],
      validators,
    };
  }
}
