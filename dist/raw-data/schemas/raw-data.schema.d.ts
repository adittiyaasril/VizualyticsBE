import * as mongoose from 'mongoose';
export declare const RawDataSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    resultTime?: Date;
    enodebId?: string;
    cellId?: string;
    availDur?: number;
}, mongoose.Document<unknown, {}, {
    resultTime?: Date;
    enodebId?: string;
    cellId?: string;
    availDur?: number;
}> & {
    resultTime?: Date;
    enodebId?: string;
    cellId?: string;
    availDur?: number;
} & {
    _id: mongoose.Types.ObjectId;
}>;
export interface RawData extends mongoose.Document {
    resultTime: Date;
    enodebId: string;
    cellId: string;
    availDur: number;
}
