import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Responses } from './commom/interceptor/response.global';
import { HttpFilter } from './commom/interceptor/filter.global';
import { Guard } from './commom/interceptor/guard.global';
import { swaggerOptions, swaggerUrl } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalGuards(new Guard());

  app.useGlobalFilters(new HttpFilter());

  app.useGlobalInterceptors(new Responses());

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    swaggerUrl,
    app,
    SwaggerModule.createDocument(app, swaggerOptions),
  );

  await app.listen(10020);
}
bootstrap();
