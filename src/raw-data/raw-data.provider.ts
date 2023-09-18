import { Connection } from 'mongoose';
import { RawDataSchema } from './schemas/raw-data.schema';

export const rawDataProviders = [
  {
    provide: 'RawData',
    useFactory: (connection: Connection) =>
      connection.model('RawData', RawDataSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
