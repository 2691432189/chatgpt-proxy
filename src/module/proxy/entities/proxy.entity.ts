import { UUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('dialogue')
export class Dialogue {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', comment: '用户对话' })
  userText: string;

  @Column({ type: 'varchar', comment: 'chatgpt对话' })
  botText: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createDate: Date;
}
