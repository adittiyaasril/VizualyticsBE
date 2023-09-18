import * as mongoose from 'mongoose';

export const RawDataSchema = new mongoose.Schema({
  resultTime: Date,
  enodebId: String,
  cellId: String,
  availDur: Number,
});

export interface RawData extends mongoose.Document {
  resultTime: Date;
  enodebId: string;
  cellId: string;
  availDur: number;
}
