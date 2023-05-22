import { IsString } from 'class-validator';

export class QueryChatGptDto {
  @IsString()
  text: string;

  @IsString()
  id: string;

  @IsString()
  questionId: string;
}
