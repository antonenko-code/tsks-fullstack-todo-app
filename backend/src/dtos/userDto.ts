export default class UserDto {
  email;
  id;
  isActivated;

  constructor(model: any) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
