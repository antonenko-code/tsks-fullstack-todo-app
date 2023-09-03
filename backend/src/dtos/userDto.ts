export default class UserDto {
  firstName;
  secondName;
  email;
  id;

  constructor(model: any) {
    this.firstName = model.firstName;
    this.secondName = model.secondName;
    this.email = model.email;
    this.id = model._id;
  }
}
