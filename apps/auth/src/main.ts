import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URL')],
      queue: 'auth',
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
