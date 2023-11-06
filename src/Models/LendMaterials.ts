import mongoose, { Document, Schema } from 'mongoose';

export interface ILendMaterials extends Document {
  email: string;
  material: mongoose.Types.ObjectId;
  date : Date;
}

const lendMaterialsSchema: Schema<ILendMaterials> = new Schema({
  email: {
    type: String,
    required: true,
  },
  material: {
    type: Schema.Types.ObjectId,
    ref: 'Materials',
  },
  date: {
    type : Date,
    required: true
  }
});

const LendMaterial = mongoose.model<ILendMaterials>('LendMaterials', lendMaterialsSchema);

export default LendMaterial;