import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  pincode: { type: String,  unique: true, required: true },
  location: { type: Object, required: true },
});

export interface Location extends mongoose.Document {
  pincode: string;
  location: any;
}
