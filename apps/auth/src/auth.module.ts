import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../../libs/shared/src';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-rt.strategy';
import RabbitMQConfig from '@app/shared/config/microservice/queue.config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/auth/.env',
      isGlobal: true,
      load: [RabbitMQConfig],
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        AT_JWT_SECRET: Joi.string().required(),
        RT_JWT_SECRET: Joi.string().required(),
        AT_EXPIRY: Joi.string().required(),
        RT_EXPIRY: Joi.string().required(),
      }),
    }),
    UsersModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
