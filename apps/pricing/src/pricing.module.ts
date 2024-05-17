import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';
import { ConfigModule } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { PricingRepository } from './pricing.repository';
import {
  RoomInventoryDocument,
  RoomInventorySchema,
} from './model/room_inventory.model';
import { InventryRepository } from './inventory.repository';
import { PriceDocument, PriceSchema } from './model/price.model';
import { DatabaseModule } from '@app/shared';
import { InventoryService } from './inventory.service';
import {
  RoomTypeDocument,
  RoomTypeSchema,
} from 'apps/rooms/src/model/room_type.model';

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
    DatabaseModule,
    MongooseModule.forFeature([
      { name: PriceDocument.name, schema: PriceSchema },
      { name: RoomInventoryDocument.name, schema: RoomInventorySchema },
      { name: RoomTypeDocument.name, schema: RoomTypeSchema },
    ]),
  ],
  controllers: [PricingController],
  providers: [
    PricingService,
    InventoryService,
    PricingRepository,
    InventryRepository,
  ],
})
export class PricingModule {}
