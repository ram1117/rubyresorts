import { NestFactory } from '@nestjs/core';
import { PricingModule } from './pricing.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PricingModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.connectMicroservice(configService.getOrThrow('pricingconfig'));
  app.enableCors({
    origin: configService.getOrThrow('FRONT_END'),
    credentials: true,
  });
  await app.listen(3004);
  app.startAllMicroservices();
}
bootstrap();
