import $api from '../http';
import { AxiosResponse } from 'axios';
import { Todo } from '../types/Todo'
import { IRequestTaskData } from '../types/request/IRequestTaskData';

export class TasksService {
  static async getTasks(collectionId: string): Promise<AxiosResponse<Todo[]>> {
    return $api.get<Todo[]>(`/collections/${collectionId}/tasks`);
  }

  static async setTask(data: IRequestTaskData, collectionId: string): Promise<AxiosResponse<Todo>> {
    return $api.post<Todo>(`/collections/${collectionId}/tasks`, data);
  }

  static async updateTask(data: IRequestTaskData, taskId: string): Promise<AxiosResponse<Todo>> {
    return $api.patch(`/collections/tasks/${taskId}`, data);
  }

  static async deleteTask(taskId: string): Promise<AxiosResponse<Todo>> {
    return $api.delete<Todo>(`/collections/tasks/${taskId}`);
  }
}
