import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { ChatgptModule } from '../chatgpt/chatgpt.module';
import { Dialogue } from './entities/proxy.entity';

@Module({
  imports: [ChatgptModule, TypeOrmModule.forFeature([Dialogue])],
  controllers: [ProxyController],
  providers: [ProxyService],
  exports: [ProxyService],
})
export class ProxyModule {}
