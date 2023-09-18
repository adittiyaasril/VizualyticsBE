import { Module } from '@nestjs/common';
import { RawDataModule } from './raw-data/raw-data.module';

@Module({
  imports: [RawDataModule],
})
export class AppModule {}
