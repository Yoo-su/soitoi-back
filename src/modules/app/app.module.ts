import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities';
import { Work } from '../work/entities';
import { ChatModule } from '../chat/chat.module';
import { Chat } from '../chat/entities/chat.entity';
import { RoomModule } from '../room/room.module';
import { Room } from '../room/entities/room.entity';
import { WorkModule } from '../work/work.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'soitoi',
      entities: [User, Work, Room, Chat],
      synchronize: true, // 개발 중에는 true (운영에서는 false 권장)
    }),
    RoomModule,
    ChatModule,
    WorkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
