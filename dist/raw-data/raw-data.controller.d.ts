/// <reference types="multer" />
import { RawDataService } from './raw-data.service';
export declare class RawDataController {
    private readonly rawDataService;
    constructor(rawDataService: RawDataService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    getGraph(enodebId: string, cellId: string, startDate: string, endDate: string): Promise<any[]>;
}
