import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieparser from 'cookie-parser';
import rawbodyMiddleware from './middlewares/rawbody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.use(cookieparser());
  app.use(rawbodyMiddleware());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.connectMicroservice(configService.getOrThrow('paymentconfig'));
  app.enableCors({
    origin: configService.getOrThrow('FRONT_END'),
    credentials: true,
  });
  app.startAllMicroservices();
  app.listen(3006);
}
bootstrap();
