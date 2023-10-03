import CollectionModel, { CollectionDocument } from '../models/collection-model';
import CollectionDto from '../dtos/collectionDto';
import ResponseError from '../errors/responseError';
import TaskModel from '../models/task-model';
import TasksService from './tasksService';

type RequestBody = {
  userId: string,
  title: string,
  iconName: string,
  color: string,
}

class CollectionsService {

  async setCollection(req: RequestBody) {
    const {userId, title, iconName, color} = req;
    const collection = new CollectionModel({userId, title, iconName, color});
    await collection.save();

    return new CollectionDto(collection);
  }

  async getCollections(userId: string) {
    const collections = await CollectionModel.find({userId: userId})
      .then(collections => {
        return collections.map(async (collection) => {
          const tasks = await TasksService.getTasks(userId, collection.id);
          const finishedAmount = tasks.filter(task => task.completed);
          return new CollectionDto(collection, tasks.length, finishedAmount.length);
        });
      });

    if (!collections.length) {
      return [];
    }
    return Promise.all(collections);
  }

  async updateCollection(userId: string, id: string, data: Partial<CollectionDocument>) {
    const collection = await CollectionModel.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!collection) {
      throw new ResponseError('Collection not found')
    }

    return new CollectionDto(collection);
  }

  async deleteCollection(userId: string, id: string) {
    const collection = await CollectionModel.findOneAndDelete({_id: id, userId});

    if (!collection) {
      throw new ResponseError('Collection not found')
    }

    await TaskModel.deleteMany({collectionId: id})

    return new CollectionDto(collection);
  }
}

export default new CollectionsService();
