import { Model } from 'mongoose';
import { RawData } from '../raw-data/schemas/raw-data.schema';
export declare class RawDataService {
    private readonly rawDataModel;
    constructor(rawDataModel: Model<RawData>);
    create(data: any[]): Promise<RawData[]>;
    getGraphData(enodebId: string, cellId: string, startDate: string, endDate: string): Promise<any[]>;
}
