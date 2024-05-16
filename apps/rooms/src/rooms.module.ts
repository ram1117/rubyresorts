import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomTypeDocument, RoomTypeSchema } from './model/room_type.model';
import { RoomTypeRepository } from './rooms.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AmenityDocument, AmenitySchema } from './model/amenity.model';
import { SeederService } from './seeder.service';
import {
  PriceDocument,
  PriceSchema,
} from '../../pricing/src/model/price.model';
import {
  RoomInventoryDocument,
  RoomInventorySchema,
} from 'apps/pricing/src/model/room_inventory.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/rooms/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
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
  providers: [RoomsService, SeederService, RoomTypeRepository],
})
export class RoomsModule {}
