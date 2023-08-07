import {Schema, model} from 'mongoose';

const User = new Schema({
  firstName: {type: String, required: true},
  secondName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
})

export default model('User', User);
