import ResponseError from '../errors/responseError';
import TaskModel, { TaskDocument } from '../models/task-model';
import TaskDto from '../dtos/taskDto';

type RequestBody = {
  userId: string;
  collectionId: string;
  title: string;
  date: string;
}

class TasksService {
  async setTask(req: RequestBody) {
    const {userId, collectionId, title, date} = req;
    const task = new TaskModel({userId, collectionId, title, date});
    await task.save();

    return new TaskDto(task);
  }

  async getTasks(userId: string, collectionId: string) {
    const tasks = await TaskModel.find({userId, collectionId})
      .then(tasks => {
        return tasks.map((task) => new TaskDto(task));
      });

    if (!tasks.length) {
      return [];
    }

    return tasks;
  }


  async updateTask(userId: string, id: string, data: Partial<TaskDocument>) {
    const task = await TaskModel.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!task) {
      throw new ResponseError('Task not found')
    }

    return new TaskDto(task);
  }

  async deleteTask(userId: string, id: string) {
    const task = await TaskModel.findOneAndDelete({_id: id, userId});

    if (!task) {
      throw new ResponseError('Task not found')
    }

    return new TaskDto(task);
  }
}

export default new TasksService();
