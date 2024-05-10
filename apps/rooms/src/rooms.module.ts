import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomTypeDocument, RoomTypeSchema } from './model/room_type.model';
import { RoomTypeRepository } from './rooms.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/rooms/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: RoomTypeDocument.name, schema: RoomTypeSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomTypeRepository],
})
export class RoomsModule {}
