import { IsString, IsArray, isString } from 'class-validator';

export class QueryChatGptDto {
  @IsString()
  msgId: string;

  @IsString()
  msgText: string;
}

export class AutoSorDto {
  sortList: any[];

  @IsArray()
  questionList: any[];
}

export class ChatgptDto {
  @IsString()
  msgText: string;

  msgId: string;
}
