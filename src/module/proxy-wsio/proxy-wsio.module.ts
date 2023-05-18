import { Module } from '@nestjs/common';
import { ProxyWsioService } from './proxy-wsio.service';
import { ProxyWsioGateway } from './proxy-wsio.gateway';
import { ChatgptModule } from '../chatgpt/chatgpt.module';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [ChatgptModule, ProxyModule],
  providers: [ProxyWsioGateway, ProxyWsioService],
})
export class ProxyWsioModule {}
