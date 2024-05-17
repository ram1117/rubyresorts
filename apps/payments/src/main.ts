import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.connectMicroservice(configService.getOrThrow('paymentconfig'));
  app.startAllMicroservices();
}
bootstrap();
