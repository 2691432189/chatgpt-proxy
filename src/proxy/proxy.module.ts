import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { ChatgptModule } from '../chatgpt/chatgpt.module';

@Module({
  imports: [ChatgptModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
