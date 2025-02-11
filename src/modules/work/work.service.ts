import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  create(createWorkDto: CreateWorkDto) {
    return 'This action adds a new work';
  }

  async getAllworks() {
    return await this.workRepository.find({
      order: { created_at: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} work`;
  }

  updateWork(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
