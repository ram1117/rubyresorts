import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RoomsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.getOrThrow('FRONT_END'),
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
