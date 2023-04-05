import { Schema, model } from 'mongoose';

const ReserveSchema = new Schema({
  date: String,
  user: {
    // getting user id
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  house: {
    // getting house id
    type: Schema.Types.ObjectId,
    ref: 'House',
  },
});

export default model('Reserve', ReserveSchema);
