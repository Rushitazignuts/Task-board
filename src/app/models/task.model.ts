export type TaskStatus = 'todo' | 'inprogress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  completed: boolean; 
  createdAt: Date;
}

export interface TaskStats {
  total: number;
  todo: number;
  inprogress: number;
  completed: number;
}
