import { IsString } from 'class-validator';

export class QueryChatGptDto {
  @IsString()
  test: string;

  @IsString()
  id: string;
}
