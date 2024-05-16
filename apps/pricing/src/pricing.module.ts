import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';
import { ConfigModule } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [RabbitMQConfig],
      isGlobal: true,
      envFilePath: 'apps/pricing/.env',
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
      }),
    }),
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
