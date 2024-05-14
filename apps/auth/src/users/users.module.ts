import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../../../libs/shared/src';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './models/userdocument';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
