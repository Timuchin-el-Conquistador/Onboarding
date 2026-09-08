import { FormControl } from '@angular/forms';

export interface ITodoForm {
  name: FormControl<string>;
}

export interface ITaskForm {
  name: FormControl<string>;
}
