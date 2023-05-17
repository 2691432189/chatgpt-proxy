import {
  Controller,
  Query,
  Sse,
  MessageEvent,
  Post,
  Body,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProxyService } from './proxy.service';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { QueryChatGptDto, AutoSorDto } from './dto/proxy.dto';

@Controller('proxy')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly chatgptService: ChatgptService,
  ) {}

  @Sse('chatgptSse')
  queryChatGpt(@Query() queryData: QueryChatGptDto): Observable<MessageEvent> {
    const { msgId, msgText } = queryData;

    return this.proxyService.queryChatGpt(msgId, msgText, this.chatgptService);
  }

  @Post('autoSort')
  autoSort(@Body() bodyData: AutoSorDto) {
    const { sortList, questionList } = bodyData;

    return this.proxyService.autoSort(
      sortList,
      questionList,
      this.chatgptService,
    );
  }
}
