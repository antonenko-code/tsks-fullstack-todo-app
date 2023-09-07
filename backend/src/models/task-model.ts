import {Schema, Document, model} from 'mongoose';

export interface TaskDocument extends Document {
  userId: string;
  collectionId: string;
  title: string;
  completed: boolean;
  date: string;
}

const TaskSchema = new Schema<TaskDocument>({
  userId: {type: String, required: true},
  collectionId: {type: String, required: true},
  title: {type: String, required: true},
  completed: {type: Boolean, required: true, default: false},
  date: {type: String, required: true},
})

export default model('Task', TaskSchema);
