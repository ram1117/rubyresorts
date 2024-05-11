import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../../libs/shared/src';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/auth/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
