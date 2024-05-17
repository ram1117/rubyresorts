import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDocoment, InvoiceSchema } from './models/invoice.model';
import {
  ReservationsDocument,
  ReservationsSchema,
} from 'apps/reservations/src/models/reservations.model';
import { PaymentsRepository } from './payments.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/payments/.env',
      load: [RabbitMQConfig],
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().required(),
        MONGODB_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: InvoiceDocoment.name, schema: InvoiceSchema },
      { name: ReservationsDocument.name, schema: ReservationsSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
