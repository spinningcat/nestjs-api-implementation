import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataDeliverenceService } from '../services/data-services';

@Module({
  imports: [ConfigModule],
  providers: [DataDeliverenceService],
  exports: [DataDeliverenceService],
})
export class DataDeliverenceModule {}