import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './module/proxy/proxy.module';
import { ChatgptModule } from './module/chatgpt/chatgpt.module';

@Module({
  imports: [ProxyModule, ChatgptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
