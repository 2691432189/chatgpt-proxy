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

@Controller('proxy')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly chatgptService: ChatgptService,
  ) {}

  @Sse('chatgptSse')
  queryChatGpt(
    @Query('msgId') msgId: string,
    @Query('msgText') msgText: string,
  ): Observable<MessageEvent> {
    return this.proxyService.queryChatGpt(msgId, msgText, this.chatgptService);
  }

  @Post('autoSort')
  autoSort(
    @Body('sortList') sortList: any[],
    @Body('questionList') questionList: any[],
  ) {
    return this.proxyService.autoSort(
      sortList,
      questionList,
      this.chatgptService,
    );
  }
}
