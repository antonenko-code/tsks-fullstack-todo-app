import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  secondName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
})

export default model('User', UserSchema);
