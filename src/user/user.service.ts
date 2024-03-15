import { Injectable } from '@nestjs/common';
import { User } from 'src/Entities/user';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/Entities/Organisation';
import { CreateOrganizationDto } from './dto/create-user.dto/create-organisation.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organisationrepository: Repository<Organization>,
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
    createorganisationdto: CreateOrganizationDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });

    const organization = new Organization();
    organization.name = createorganisationdto.name;
    organization.email = createorganisationdto.email;
    organization.aboutUs = createorganisationdto.aboutus;
    organization.services = createorganisationdto.services;
    organization.serviceArea = createorganisationdto.servicearea;
    organization.Top_Clients = createorganisationdto.Top_Clients;
    organization.success_story = createorganisationdto.success_story;
    organization.address = createorganisationdto.address;

    organization.users = [user];

    await this.organisationrepository.save(organization);
    user.organization = organization;
    await this.userRepository.save(user);
    return organization;
  }

  async get_organisation_details(user_id: number) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['organization'],
    });

    console.log('user:', user);
    return user.organization, user;
  }
}
