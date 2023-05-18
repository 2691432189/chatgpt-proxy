import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './module/proxy/proxy.module';
import { ChatgptModule } from './module/chatgpt/chatgpt.module';
import { typeormOptions } from './configs/typeorm.config';
import { ProxyWsioModule } from './module/proxy-wsio/proxy-wsio.module';

@Module({
  imports: [
    ProxyModule,
    ChatgptModule,
    TypeOrmModule.forRoot(typeormOptions),
    ProxyWsioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
