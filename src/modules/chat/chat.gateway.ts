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
    const { nickname } = createChatDto;
    const addedChat = await this.chatService.createChat(createChatDto);
    if (addedChat) {
      this.typingUsers.delete(nickname);
      client.broadcast.emit('chat-updates', {
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
      this.typingUsers.set(user.nickname, user);
    } else {
      this.typingUsers.delete(user.nickname);
    }
    client.broadcast.emit('typing-users', Array.from(this.typingUsers.values()));
  }
}
