import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
