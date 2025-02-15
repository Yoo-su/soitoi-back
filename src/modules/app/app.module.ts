import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities';
import { Work } from '../work/entities';
import { ChatModule } from '../chat/chat.module';
import { Chat } from '../chat/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '@o01047550871',
      database: 'soitoi',
      entities: [User, Work, Chat],
      synchronize: true, // 개발 중에는 true (운영에서는 false 권장)
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
