export interface ITask {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
  completedAt: string | null;
  editAt: string | null;
}

export interface ITodoList {
  id: number;
  title: string;
  createdAt: string;
  tasks: ITask[];
}