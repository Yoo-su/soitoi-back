import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { RandomUser } from './types/random-user.type';

@WebSocketGateway({ namespace: 'socket/chat', cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  private typingUsers = new Map<string, RandomUser>();

  @SubscribeMessage('chat-created')
  async create(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: Socket) {
    const addedChat = await this.chatService.createChat(createChatDto);
    if (addedChat) {
      this.typingUsers.delete(client.id);
      this.server.emit('chat-updates', {
        typingUsers: Array.from(this.typingUsers.values()),
        newChat: addedChat,
      });
    }
  }

  @SubscribeMessage('find-all-chat')
  findAll() {
    return;
  }

  @SubscribeMessage('find-one-chat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('remove-chat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  @SubscribeMessage('typing-chat')
  handleTypingUser(@MessageBody() data: { user: RandomUser; isTyping: boolean }, @ConnectedSocket() client: Socket) {
    const { user, isTyping } = data;
    if (isTyping) {
      this.typingUsers.set(client.id, user);
    } else {
      this.typingUsers.delete(client.id);
    }
    client.broadcast.emit('typing-users', Array.from(this.typingUsers.values()));
  }

  // ✅ 사용자가 연결되면 실행행
  handleConnection(client: Socket) {
    const { user } = client.handshake.auth;
    console.log('connected user info:', user, 'clientID:', client.id);
  }

  // ✅ 사용자가 페이지를 닫거나 네트워크가 끊어지면 자동으로 실행
  handleDisconnect(client: Socket) {
    if (this.typingUsers.has(client.id)) {
      this.typingUsers.delete(client.id);
      // 모든 클라이언트에 업데이트된 typingUsers 목록 전송
      this.server.emit('typing-users', Array.from(this.typingUsers.values()));
    }
  }
}
