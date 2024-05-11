import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../../../libs/shared/src';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './models/userdocument';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
