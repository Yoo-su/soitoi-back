import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@WebSocketGateway({ namespace: 'events' })
export class WorkGateway {
  constructor(private readonly workService: WorkService) {}

  @SubscribeMessage('createWork')
  create(@MessageBody() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @SubscribeMessage('findAllWork')
  findAll() {
    return this.workService.findAll();
  }

  @SubscribeMessage('findOneWork')
  findOne(@MessageBody() id: number) {
    return this.workService.findOne(id);
  }

  @SubscribeMessage('updateWork')
  update(@MessageBody() updateWorkDto: UpdateWorkDto) {
    return this.workService.update(updateWorkDto.id, updateWorkDto);
  }

  @SubscribeMessage('removeWork')
  remove(@MessageBody() id: number) {
    return this.workService.remove(id);
  }
}
