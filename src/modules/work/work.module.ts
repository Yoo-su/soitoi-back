import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkGateway } from './work.gateway';

@Module({
  providers: [WorkGateway, WorkService],
})
export class WorkModule {}
