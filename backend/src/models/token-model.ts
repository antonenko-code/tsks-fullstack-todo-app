import {Schema, model} from 'mongoose';
import transactionPlugin from "../transactions/transactionPlugin";

const TokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  refreshToken: {type: String, required: true},
})

TokenSchema.plugin(transactionPlugin);

export default model('Token', TokenSchema);
