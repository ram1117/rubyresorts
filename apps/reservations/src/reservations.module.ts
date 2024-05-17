import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './models/reservations.model';
import { ReservationsRepository } from './reservations.repoistory';
import { ClientsModule } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/shared/constants';
import {
  UserDocument,
  UserSchema,
} from 'apps/auth/src/users/models/userdocument';
import {
  RoomTypeDocument,
  RoomTypeSchema,
} from 'apps/rooms/src/model/room_type.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/reservations/.env',
      load: [RabbitMQConfig],
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ReservationsDocument.name, schema: ReservationsSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: RoomTypeDocument.name, schema: RoomTypeSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.AUTH,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.getOrThrow('authconfig'),
      },
      {
        name: SERVICE_NAMES.PRICING,
        inject: [ConfigService],
        useFactory: (configService) =>
          configService.getOrThrow('pricingconfig'),
      },
      {
        name: SERVICE_NAMES.PAYMENT,
        inject: [ConfigService],
        useFactory: (configService) =>
          configService.getOrThrow('paymentconfig'),
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
