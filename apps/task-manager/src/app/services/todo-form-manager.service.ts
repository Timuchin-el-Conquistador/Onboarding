import { Injectable, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import type { ITask, ITaskForm, IForm, ITodoForm } from '../models';
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

  createTodo(
    title: string,
    id = this.#getNextTodoId(),
    tasks: ITask[] = [],
  ): void {
    this.form.controls.todo.push(this.#createTodoGroup(id, title, tasks));
  }

  createTask(todoIndex: number, title: string): void {
    const id = this.#getNextTaskId(todoIndex);

    this.getTodoTasks(todoIndex).push(this.createTaskGroup(id, title, false));
  }

  createTaskGroup(
    id: number,
    title: string,
    completed: boolean,
  ): FormGroup<ITaskForm> {
    return this.#formFactory.createForm<ITaskForm>(
      this.#createTaskSchema(id, title, completed),
    );
  }

  getTodoTasks(index: number): FormArray<FormGroup<ITaskForm>> {
    return this.form.controls.todo.at(index).controls.tasks;
  }

  removeTodo(index: number): void {
    this.form.controls.todo.removeAt(index);
  }

  removeTask(todoIndex: number, taskIndex: number): void {
    this.getTodoTasks(todoIndex).removeAt(taskIndex);
  }

  #createTodoGroup(
    id: number,
    title: string,
    tasks: ITask[],
  ): FormGroup<ITodoForm> {
    return this.#formFactory.createForm<ITodoForm>(
      this.#createTodoSchema(id, title, tasks),
    );
  }

  #createTodoSchema(
    id: number,
    title: string,
    tasks: ITask[],
  ): IFormSchemaConfig {
    return {
      fields: [
        this.#createField('title', title, { required: true }),
        this.#createField('id', id),
        {
          name: 'tasks',
          type: 'custom',
          defaultValue: '',
          isCollection: true,
          children: tasks.flatMap((task) => this.#createTaskFields(task)),
        },
      ],
    };
  }

  #createTaskSchema(
    id: number,
    title: string,
    completed: boolean,
  ): IFormSchemaConfig {
    return {
      fields: [
        this.#createField('title', title, {
          required: true,
          custom: [requiredTrimmed()],
        }),
        this.#createField('id', id),
        this.#createField('completed', completed),
      ],
    };
  }

  #createTaskFields(task: ITask): IFormFieldConfig[] {
    return [
      this.#createField('id', task.id),
      this.#createField('title', task.title, { required: true }),
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
      children: [],
      validators,
    };
  }

  #getNextTodoId(): number {
    const todos = this.form.controls.todo;

    return todos.length
      ? Math.max(...todos.controls.map((todo) => todo.controls.id.value)) + 1
      : 1;
  }

  #getNextTaskId(todoIndex: number): number {
    const tasks = this.getTodoTasks(todoIndex);

    return tasks.length
      ? Math.max(...tasks.controls.map((task) => task.controls.id.value)) + 1
      : 1;
  }
}
