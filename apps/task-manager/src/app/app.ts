import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  imports: [RouterModule, TaskListComponent, TaskFormComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'task-manager';
}
