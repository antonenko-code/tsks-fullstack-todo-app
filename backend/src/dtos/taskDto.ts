export default class TaskDto {
  id;
  userId;
  collectionId;
  title;
  completed;
  date;

  constructor(model: any) {
    this.id = model._id;
    this.userId = model.userId;
    this.collectionId = model.collectionId;
    this.title = model.title;
    this.completed = model.completed;
    this.date = model.date;
  }
}
