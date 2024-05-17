import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [RabbitMQConfig],
      envFilePath: 'apps/mailer/.env',
      validationSchema: Joi.object({}),
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
