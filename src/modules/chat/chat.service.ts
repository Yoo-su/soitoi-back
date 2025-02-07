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

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = this.chatRepository.create(createChatDto);
    return await this.chatRepository.save(chat);
  }

  async findAllChats(): Promise<Chat[]> {
    return await this.chatRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<Chat | null> {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
