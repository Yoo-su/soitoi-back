import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Work } from 'src/modules/work/entities';

@Entity('user') // 테이블 이름을 users로 변경 (MySQL 예약어 'user' 피하기 위해)
export class User {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @OneToMany(() => Work, (work) => work.created_by)
  works: Work[];
}
