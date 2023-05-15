import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Responses } from '../commom/interceptor/response';
import { HttpFilter } from '../commom/interceptor/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.useGlobalFilters(new HttpFilter());

  await app.useGlobalInterceptors(new Responses());

  await app.listen(10020);
}
bootstrap();
