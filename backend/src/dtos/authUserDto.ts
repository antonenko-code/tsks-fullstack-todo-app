export default class AuthUserDto {
  email;
  id;

  constructor(model: any) {
    this.email = model.email;
    this.id = model._id;
  }
}
