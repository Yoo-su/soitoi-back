import { Test, TestingModule } from '@nestjs/testing';
import { WorkGateway } from './work.gateway';
import { WorkService } from './work.service';

describe('WorkGateway', () => {
  let gateway: WorkGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkGateway, WorkService],
    }).compile();

    gateway = module.get<WorkGateway>(WorkGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
