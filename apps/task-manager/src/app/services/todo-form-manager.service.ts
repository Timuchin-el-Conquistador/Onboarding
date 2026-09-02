import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import type { ITask } from '../models';
import type { ITaskForm, ITodoListForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoFormManagerService {
  readonly #fb = inject(FormBuilder);

  readonly form = this.#fb.group({
    title: this.#fb.control('', Validators.required),
    todo: this.#fb.array<FormGroup<ITodoListForm>>([]),
  });

  createTodo(
    title: string,
    id: number = this.form.controls.todo.length + 1,
    tasks: ITask[] = [],
  ): void {
    this.form.controls.todo.push(this.createTodoGroup(id, title, tasks));
  }

  createTodoGroup(
    id: number,
    title: string,
    tasks: ITask[],
  ): FormGroup<ITodoListForm> {
    return this.#fb.group<ITodoListForm>({
      id: this.#fb.control(id, { nonNullable: true }),
      title: this.#fb.control(title, {
        nonNullable: true,
        validators: Validators.required,
      }),
      tasks: this.#fb.array<FormGroup<ITaskForm>>(
        tasks.map((task) =>
          this.createTaskGroup(task.id, task.title, task.completed),
        ),
      ),
    });
  }

  createTask(todoIndex: number, title: string): void {
    this.getTodoTasks(todoIndex).push(
      this.createTaskGroup(this.#getNextTaskId(todoIndex), title, false),
    );
  }

  createTaskGroup(
    id: number,
    title: string,
    completed: boolean,
  ): FormGroup<ITaskForm> {
    return this.#fb.group<ITaskForm>({
      id: this.#fb.control(id, { nonNullable: true }),
      title: this.#fb.control(title, {
        nonNullable: true,
        validators: Validators.required,
      }),
      completed: this.#fb.control(completed, { nonNullable: true }),
    });
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

  #getNextTaskId(todoIndex: number): number {
    const tasks = this.getTodoTasks(todoIndex);

    return tasks.length
      ? Math.max(...tasks.controls.map((task) => task.controls.id.value)) + 1
      : 1;
  }
}
