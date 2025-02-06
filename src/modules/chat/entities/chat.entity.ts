import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn() // auto-incremented id
  id: number;

  @Column({ type: 'varchar', length: 50 })
  room_id: string; // 채팅방 ID

  @Column({ type: 'varchar', length: 50 })
  nickname: string; // 익명 사용자 닉네임

  @Column({ type: 'text' })
  message: string; // 채팅 내용

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; // 메시지 전송 시간
}
