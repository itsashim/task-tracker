// import { Task, CreateTaskData, UpdateTaskData } from '../types';
import type { Task, CreateTaskData, UpdateTaskData } from '../types';

const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks');
  }

  async getTask(id: number): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const now = new Date().toISOString();
    const newTask = {
      ...taskData,
      status: 'pending' as const,
      createdAt: now,
      updatedAt: now,
    };

    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
    });
  }

  async updateTask(id: number, taskData: UpdateTaskData): Promise<Task> {
    const updateData = {
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    return this.request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  }

  async deleteTask(id: number): Promise<void> {
    await this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
