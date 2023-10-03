export default class CollectionDto {
  userId;
  title;
  iconName;
  color;
  id;
  taskAmount;
  finishedTaskAmount;

  constructor(model: any, taskAmount: number = 0, finishedTaskAmount: number = 0) {
    this.userId = model.userId;
    this.title = model.title;
    this.iconName = model.iconName;
    this.color = model.color;
    this.id = model._id;
    this.taskAmount = taskAmount;
    this.finishedTaskAmount = finishedTaskAmount;
  }
}
