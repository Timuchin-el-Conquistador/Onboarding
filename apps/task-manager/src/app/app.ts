import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';
import { TodoFormManagerService, TodoManagerService } from './services';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  imports: [TaskFormComponent, TaskSummaryComponent, TaskListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #todoFormManager = inject(TodoFormManagerService);
  readonly #todoManager = inject(TodoManagerService);

  readonly todoForm = this.#todoFormManager.form;
  readonly tasksForm$ = this.todoForm.controls.tasks.valueChanges;

  ngOnInit(): void {
    this.#todoManager.getTasks().subscribe((tasks) => {
      tasks
        .sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1,
        )
        .forEach((task) => {
          this.#todoFormManager.createTask(
            task.title,
            task.description,
            task.completed,
            task.id,
          );
        });
    });
  }

  get totalTasksCount(): number {
    return this.#todoFormManager.form.controls.tasks.length;
  }

  clearTasks(): void {
    this.#todoFormManager.clearTasks();
  }
}
