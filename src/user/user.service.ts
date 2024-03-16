import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/Entities/user';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

import { CreatePersonalDetailsDto } from './dto/create-user.dto/create-personal_details.dto';
import { Additional_Details } from 'src/Entities/Additional_Details';
import { threadId } from 'worker_threads';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Additional_Details)
    private readonly Additinal_details: Repository<Additional_Details>,
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

  async create_organisation_details(
    user_id: number,

    personal_details: CreatePersonalDetailsDto,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });

      let additional_details = new Additional_Details();
      additional_details.name = personal_details.name;
      additional_details.email = personal_details.email;
      additional_details.aboutUs = personal_details.aboutus;
      additional_details.services = personal_details.services;
      additional_details.serviceArea = personal_details.servicearea;
      additional_details.Top_Clients = personal_details.Top_Clients;
      additional_details.success_story = personal_details.success_story;
      additional_details.address = personal_details.address;
      additional_details.Anniversary = personal_details.Anniversary;
      additional_details.DOB = personal_details.DOB;
      additional_details.spouse_name = personal_details.spouse_name;
      additional_details.Hobbies = personal_details.Hobbies;
      additional_details.Looking_For = personal_details.Looking_For;
      additional_details.Refreral_Partners = personal_details.Refreral_Partners;

      additional_details.user = user;
      await this.Additinal_details.save(additional_details);
      await this.userRepository.save(user);
      return { additional_details };
    } catch (error) {
      throw new NotFoundException(
        'Additoinal details are already present for this user',
      );
    }
  }

  async get_organisation_details(user_id: number) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['additional_details'],
    });

    console.log('user:', user);
    return { user };
  }
}
