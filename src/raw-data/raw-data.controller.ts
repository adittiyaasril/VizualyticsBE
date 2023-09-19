import {
  Controller,
  Post,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as zlib from 'zlib';
import * as csv from 'csv-parser';
import { RawDataService } from './raw-data.service';
import { Readable } from 'stream';

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const results = [];

    if (file.originalname.endsWith('.gz')) {
      const unzipStream = zlib.createGunzip();
      const parseStream = csv();

      Readable.from(file.buffer)
        .pipe(unzipStream)
        .pipe(parseStream)
        .on('data', (data) => {
          const rawData = {
            resultTime: new Date(data['Result Time']),
            enodebId:
              (data['Object Name'].match(/eNodeB ID=(\d+)/) || [])[1] || '',
            cellId:
              (data['Object Name'].match(/Local Cell ID=(\d+)/) || [])[1] || '',
            availDur: parseInt(data['L.Cell.Avail.Dur']) || 0,
          };

          results.push(rawData);
        })
        .on('end', async () => {
          try {
            await this.rawDataService.create(results);
          } catch (error) {
            console.error(error);
            throw new Error('Failed to insert data into MongoDB');
          }
        });

      return 'File uploaded and data inserted successfully.';
    } else {
      console.error('Uploaded file is not a .gz file.');
      throw new Error('Invalid file format. Please upload a .gz file.');
    }
  }

  @Get('graph')
  async getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const graphData = await this.rawDataService.getGraphData(
      enodebId,
      cellId,
      startDate,
      endDate,
    );
    return graphData;
  }
}
