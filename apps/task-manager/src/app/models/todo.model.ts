export interface ITodo {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  name: string;
  completed: boolean;
}

export interface IBody {
  name: string;
  completed?: boolean;
}
