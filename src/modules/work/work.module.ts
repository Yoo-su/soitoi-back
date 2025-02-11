import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkGateway } from './work.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities';
import { WorkController } from './work.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkGateway, WorkService],
})
export class WorkModule {}
