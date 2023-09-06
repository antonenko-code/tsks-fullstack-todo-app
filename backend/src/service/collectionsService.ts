import CollectionModel, { CollectionDocument } from '../models/collection-model';
import CollectionDto from '../dtos/collectionDto';

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
    return CollectionModel.find({userId: userId})
      .then(collections => {
        return collections.map((collection) => new CollectionDto(collection));
      });
  }

  async updateCollection(id: string, data: Partial<CollectionDocument>) {
    const collection = await CollectionModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );

    return new CollectionDto(collection);
  }

  async deleteCollection(id: string) {
    const collection = await CollectionModel.findOneAndDelete({_id: id});

    return new CollectionDto(collection);
  }
}

export default new CollectionsService();
