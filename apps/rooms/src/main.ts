import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RoomsModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
