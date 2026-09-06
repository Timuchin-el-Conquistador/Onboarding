import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IForm {
  todo: FormArray<FormGroup<ITodoForm>>;
}

export interface ITodoForm {
  id: FormControl<string>;
  name: FormControl<string>;
  tasks: FormArray<FormGroup<ITaskForm>>;
}

export interface ITaskForm {
  id: FormControl<string>;
  name: FormControl<string>;
  completed: FormControl<boolean>;
}
