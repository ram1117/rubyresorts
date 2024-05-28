import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RoomTypeDocument,
  RoomTypeSchema,
} from '@app/shared/models/room_type.model';
import { RoomTypeRepository } from './rooms.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  AmenityDocument,
  AmenitySchema,
} from '../../../libs/shared/src/models/amenity.model';
import { PriceDocument, PriceSchema } from '@app/shared/models/price.model';
import {
  RoomInventoryDocument,
  RoomInventorySchema,
} from '@app/shared/models/room_inventory.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/rooms/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        FRONT_END: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: RoomTypeDocument.name, schema: RoomTypeSchema },
      { name: AmenityDocument.name, schema: AmenitySchema },
      { name: PriceDocument.name, schema: PriceSchema },
      { name: RoomInventoryDocument.name, schema: RoomInventorySchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomTypeRepository],
})
export class RoomsModule {}
