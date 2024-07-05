/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(
    app.select(AppModule),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    { fallbackOnErrors: true },
  );

  //const allowedDomains = process.env.ALLOWED_DOMAINS.split(',');

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  const openAPIOptions = new DocumentBuilder()
    .setTitle('chsms')
    .setDescription('api docs')
    .setVersion('1.0')
    .build();

  const openAPIDocument = SwaggerModule.createDocument(app, openAPIOptions);
  SwaggerModule.setup('api-docs', app, openAPIDocument);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

