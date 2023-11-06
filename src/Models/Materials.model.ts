import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterials extends Document {
  name: string;
  etudiants: string;
  number : number ;
  date : Date;
}

const materialsSchema: Schema<IMaterials> = new Schema({
  name: {
    type: String,
    required: true,
  },
  etudiants: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  date: {
    type : Date,
    required: true
  }
});

const Material = mongoose.model<IMaterials>('Materials', materialsSchema);

export default Material;