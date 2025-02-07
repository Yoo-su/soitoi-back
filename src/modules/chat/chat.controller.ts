import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('all')
  getAllChats(): Promise<Chat[]> {
    return this.chatService.findAllChats();
  }
}
