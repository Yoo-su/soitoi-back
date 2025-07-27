import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = this.chatRepository.create(createChatDto);
    return await this.chatRepository.save(chat);
  }

  async getAllChats(roomID: string): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: { room_id: roomID },
      order: { created_at: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Chat | null> {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
