import {Schema, Document, model} from 'mongoose';

export interface CollectionDocument extends Document {
  userId: string,
  title: string,
  iconName: string,
  color: string,
}

const CollectionSchema = new Schema<CollectionDocument>({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  iconName: {type: String, required: true, default: 'home'},
  color: {type: String, required: true, default: '#ff758f'},
})

export default model('Collection', CollectionSchema);
