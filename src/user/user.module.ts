import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user';
import { Organization } from 'src/Entities/Organisation';
@Module({
  imports: [TypeOrmModule.forFeature([User,Organization])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
