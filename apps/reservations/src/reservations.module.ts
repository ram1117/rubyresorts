import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthMSConfig from '@app/shared/config/microservice/authconfig';
import * as Joi from 'joi';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './models/reservations.model';
import { ReservationsRepository } from './reservations.repoistory';
import { ClientsModule } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/reservations/.env',
      load: [AuthMSConfig],
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ReservationsDocument.name, schema: ReservationsSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.AUTH,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.getOrThrow('authconfig'),
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
