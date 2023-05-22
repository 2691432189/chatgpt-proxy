import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyWsioService } from './proxy-wsio.service';
import { ProxyWsioGateway } from './proxy-wsio.gateway';
import { ChatgptModule } from '../chatgpt/chatgpt.module';
import { QuestionAnalyze } from './entities/proxy.entity';

@Module({
  imports: [ChatgptModule, TypeOrmModule.forFeature([QuestionAnalyze])],
  providers: [ProxyWsioGateway, ProxyWsioService],
})
export class ProxyWsioModule {}
