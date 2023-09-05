export default class CollectionDto {
  userId;
  title;
  iconName;
  color;
  id;

  constructor(model: any) {
    this.userId = model.userId;
    this.title = model.title;
    this.iconName = model.iconName;
    this.color = model.color;
    this.id = model._id;
  }
}
