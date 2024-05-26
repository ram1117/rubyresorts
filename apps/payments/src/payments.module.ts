import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
// import { InvoiceDocument, InvoiceSchema } from './models/invoice.model';
import {
  ReservationsDocument,
  ReservationsSchema,
} from 'apps/reservations/src/models/reservations.model';
import { PaymentsRepository } from './payments.repository';
import {
  UserDocument,
  UserSchema,
} from 'apps/auth/src/users/models/userdocument';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repoistory';
import { PaymentDocument, PaymentSchema } from './models/payment.model';
import { ClientsModule } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/payments/.env',
      load: [RabbitMQConfig],
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().required(),
        MONGODB_URL: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_WEBHOOK_SECRET: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ReservationsDocument.name, schema: ReservationsSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: PaymentDocument.name, schema: PaymentSchema },
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
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository, ReservationsRepository],
})
export class PaymentsModule {}
