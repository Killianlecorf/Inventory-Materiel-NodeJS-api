import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterials extends Document {
  name: string;
  description: string;
}

const materialsSchema: Schema<IMaterials> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Material = mongoose.model<IMaterials>('Materials', materialsSchema);

export default Material;