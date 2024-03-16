import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user';

import { Additional_Details } from 'src/Entities/Additional_Details';
@Module({
  imports: [TypeOrmModule.forFeature([User,Additional_Details])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
