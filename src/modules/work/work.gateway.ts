import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'events' })
export class WorkGateway {
  constructor(private readonly workService: WorkService) {}

  @SubscribeMessage('createWork')
  create(@MessageBody() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @SubscribeMessage('findAllWork')
  findAll() {
    return;
  }

  @SubscribeMessage('findOneWork')
  findOne(@MessageBody() id: number) {
    return this.workService.findOne(id);
  }

  @SubscribeMessage('updateWork')
  update(@MessageBody() updateWorkDto: UpdateWorkDto) {
    return;
  }

  @SubscribeMessage('removeWork')
  remove(@MessageBody() id: number) {
    return this.workService.remove(id);
  }

  // ✅ 사용자가 연결되면 실행
  handleConnection(client: Socket) {
    const { user } = client.handshake.auth;
    console.log('connected user info:', user, 'clientID:', client.id);
  }
}
