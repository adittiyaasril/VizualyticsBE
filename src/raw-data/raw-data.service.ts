import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { RawData } from '../raw-data/schemas/raw-data.schema';

@Injectable()
export class RawDataService {
  constructor(
    @Inject('RawData') private readonly rawDataModel: Model<RawData>,
  ) {}

  async create(data: any[]): Promise<RawData[]> {
    const sanitizedData = data.map((item) => ({
      ...item,
      resultTime: isValidDate(item.resultTime)
        ? new Date(item.resultTime)
        : null,
    }));

    const validData = sanitizedData.filter((item) => item.resultTime !== null);

    if (validData.length === 0) {
      return [];
    }

    const insertedData = await this.rawDataModel.insertMany(validData);

    return insertedData.map((doc) => doc.toObject());
  }

  async getGraphData(
    enodebId: string,
    cellId: string,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new Error('Invalid date format in startDate or endDate');
    }

    const filter = {
      enodebId,
      cellId,
      resultTime: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    const rawData = await this.rawDataModel
      .find(filter)
      .select('resultTime availDur')
      .exec();

    const graphData = rawData.map((item) => ({
      resultTime: item.resultTime,
      availability: (item.availDur / 900) * 100,
    }));

    return graphData;
  }
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.valueOf());
}
