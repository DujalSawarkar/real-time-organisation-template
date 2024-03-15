import { Injectable } from '@nestjs/common';
import { User } from 'src/Entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getuser(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createuser(createUserDto: CreateUserDto) {
    let saltRounds = 10;
    let user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, saltRounds);
    user.role = createUserDto.role;
    user.name = createUserDto.name;
    user.phone_number = createUserDto.phone_number;
    user.category = createUserDto.category;

    return await this.userRepository.save(user);
  }
}
