import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../../libs/shared/src';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/auth/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
