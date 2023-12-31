import { Module } from '@nestjs/common';
import { RawDataController } from './raw-data.controller';
import { RawDataService } from './raw-data.service';
import { rawDataProviders } from './raw-data.provider';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [RawDataController],
  imports: [MulterModule.register({}), DatabaseModule],
  providers: [RawDataService, ...rawDataProviders],
})
export class RawDataModule {}
