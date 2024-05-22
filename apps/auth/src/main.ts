import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.use(cookieparser());
  app.connectMicroservice(configService.getOrThrow('authconfig'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.startAllMicroservices();

  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
