import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { WorkService } from './work.service';
import { Server, Socket } from 'socket.io';
import { RandomUser } from 'src/shared/types';
import { DraggingInfo } from './types';
import { DRAGGING_INFOS, PARTICIPANTS, WORK_DRAG_END, WORK_DRAG_START, WORK_STATUS_UPDATE } from './constants';

@WebSocketGateway({ namespace: 'socket/work-board', cors: { origin: '*' } })
export class WorkGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly workService: WorkService) {}
  private participants = new Map<string, RandomUser>();
  private draggingInfos = new Map<string, DraggingInfo>();

  @SubscribeMessage(WORK_DRAG_START)
  handleDragStart(@MessageBody() info: DraggingInfo, @ConnectedSocket() client: Socket) {
    this.draggingInfos.set(client.id, info);
    this.server.emit(DRAGGING_INFOS, Array.from(this.draggingInfos.values()));
  }

  @SubscribeMessage(WORK_DRAG_END)
  async handleDragEnd(@MessageBody() info: DraggingInfo, @ConnectedSocket() client: Socket) {
    const { user, workID, status } = info;
    const draggingInfo = this.draggingInfos.get(client.id);

    //상태가 변경되었으면 db 업데이트
    if (draggingInfo?.status !== status) {
      await this.workService.updateWorkStatus({ workID: workID, status: status });
      this.server.emit(WORK_STATUS_UPDATE, {
        workID: workID,
        status: status,
      });
    }
    this.draggingInfos.delete(client.id);

    this.server.emit(DRAGGING_INFOS, Array.from(this.draggingInfos.values()));
  }

  // ✅ 사용자가 연결되면 실행
  handleConnection(client: Socket) {
    const { user } = client.handshake.auth;
    this.participants.set(client.id, user);
    this.server.emit(PARTICIPANTS, Array.from(this.participants.values()));
    client.emit(DRAGGING_INFOS, Array.from(this.draggingInfos.values()));
  }

  // ✅ 사용자가 페이지를 닫거나 네트워크가 끊어지면 자동으로 실행
  handleDisconnect(client: Socket) {
    if (this.participants.has(client.id)) {
      this.participants.delete(client.id);
      this.server.emit(PARTICIPANTS, Array.from(this.participants.values()));
    }
    if (this.draggingInfos.has(client.id)) {
      this.draggingInfos.delete(client.id);
      this.server.emit(DRAGGING_INFOS, Array.from(this.draggingInfos.values()));
    }
  }
}
