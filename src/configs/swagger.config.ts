import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerUrl = '/api-docs';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('chatGpt代理文档')
  .build();
