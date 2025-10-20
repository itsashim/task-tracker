export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: TaskStatus;
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  search: string;
  sortBy: 'title' | 'dueDate' | 'priority' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status?: TaskStatus;
}
