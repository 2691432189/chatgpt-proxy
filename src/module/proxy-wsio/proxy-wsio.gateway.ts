import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ProxyWsioService } from './proxy-wsio.service';
import { QueryChatGptDto } from './dto/proxy-wsio.dto';

@WebSocketGateway({
  namespace: 'proxyWs',
})
export class ProxyWsioGateway {
  constructor(private readonly proxyWsioService: ProxyWsioService) {}

  @SubscribeMessage('message')
  queryChatGpt(@MessageBody() msData: QueryChatGptDto) {
    return this.proxyWsioService.queryChatGpt(msData);
  }
}
