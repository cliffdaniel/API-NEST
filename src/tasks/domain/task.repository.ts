import { Task } from './task.entity';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  createTask(taskData: any): Promise<Task>;
}
