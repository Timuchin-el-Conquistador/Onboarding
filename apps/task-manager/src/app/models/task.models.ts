export interface ITask {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  finished: boolean;
  finishedAt: string | null;
}
