import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy/proxy.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [ProxyModule, ChatgptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
