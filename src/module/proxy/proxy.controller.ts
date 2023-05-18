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
import { QueryChatGptDto, AutoSorDto } from './dto/proxy.dto';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Sse('chatgptSse')
  queryChatGpt(@Query() queryData: QueryChatGptDto): Observable<MessageEvent> {
    const { msgId, msgText } = queryData;

    return this.proxyService.queryChatGpt(msgId, msgText);
  }

  @Post('autoSort')
  autoSort(@Body() bodyData: AutoSorDto) {
    const { sortList, questionList } = bodyData;

    return this.proxyService.autoSort(sortList, questionList);
  }
}
