import { Injectable, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

export interface ITaskForm {
  id: FormControl<number>;
  title: FormControl<string>;
  description: FormControl<string>;
  completed: FormControl<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class TodoFormManagerService {
  readonly #fb = inject(NonNullableFormBuilder);

  readonly form = this.#fb.group({
    title: this.#fb.control('', Validators.required),
    description: this.#fb.control('', Validators.required),
    tasks: this.#fb.array<FormGroup<ITaskForm>>([]),
  });

  createTask(
    title: string,
    description: string,
    completed: boolean = false,
    id: number = this.form.controls.tasks.length + 1,
  ): void {
    this.form.controls.tasks.push(
      this.createTaskGroup(title, description, completed, id),
    );
  }

  createTaskGroup(
    title: string,
    description: string,
    completed: boolean,
    id: number,
  ): FormGroup<ITaskForm> {
    return this.#fb.group<ITaskForm>({
      id: this.#fb.control(id),
      title: this.#fb.control(title, [Validators.required]),
      description: this.#fb.control(description, Validators.required),
      completed: this.#fb.control(completed),
    });
  }

  clearTasks(): void {
    this.form.controls.tasks.clear();
  }

  removeTask(index: number): void {
    this.form.controls.tasks.removeAt(index);
  }
}
