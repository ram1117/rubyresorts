import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieparser());
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
