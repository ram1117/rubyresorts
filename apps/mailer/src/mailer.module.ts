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
      validationSchema: Joi.object({
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        FRONT_END: Joi.string().required(),
      }),
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
