import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice(configService.getOrThrow('mailerconfig'));
  app.startAllMicroservices();
}
bootstrap();
