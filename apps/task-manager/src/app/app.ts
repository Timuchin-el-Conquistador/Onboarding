import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
