export interface ITask {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  completedAt: string | null;
  editAt: string | null;
}
