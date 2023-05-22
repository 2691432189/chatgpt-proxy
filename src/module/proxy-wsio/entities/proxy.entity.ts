import { UUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('question_analyze')
export class QuestionAnalyze {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', comment: '考题id', length: 20 })
  questionId: string;

  @Column({ type: 'varchar', comment: '考题题目', length: 4096 })
  questionTitle: string;

  @Column({ type: 'varchar', comment: '考题解析', length: 4096 })
  analyze: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createDate: Date;
}
