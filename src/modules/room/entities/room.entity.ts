import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('room')
export class Room {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  roomId: string;

  @Column({ type: 'varchar', length: 100 })
  roomName: string;

  @Column({ type: 'varchar', length: 50 })
  creatorNickname: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
