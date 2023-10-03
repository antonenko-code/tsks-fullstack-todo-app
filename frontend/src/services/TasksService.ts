import $api from '../http';
import { AxiosResponse } from 'axios';
import { Task } from '../types/Task'
import { IRequestTaskData } from '../types/request/IRequestTaskData';

export class TasksService {
  static async getTasks(collectionId: string): Promise<AxiosResponse<Task[]>> {
    return $api.get<Task[]>(`/collections/${collectionId}/tasks`);
  }

  static async setTask(data: IRequestTaskData, collectionId: string): Promise<AxiosResponse<Task>> {
    return $api.post<Task>(`/collections/${collectionId}/tasks`, data);
  }

  static async updateTask(data: IRequestTaskData, taskId: string): Promise<AxiosResponse<Task>> {
    return $api.patch(`/collections/tasks/${taskId}`, data);
  }

  static async deleteTask(taskId: string): Promise<AxiosResponse<Task>> {
    return $api.delete<Task>(`/collections/tasks/${taskId}`);
  }
}
