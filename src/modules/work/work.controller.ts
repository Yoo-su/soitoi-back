import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkService } from './work.service';
import { UpdateWorkDto } from './dto/update-work.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get('all')
  findAllWorks() {
    return this.workService.getAllworks();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.workService.updateWork(+id, updateWorkDto);
  }
}
