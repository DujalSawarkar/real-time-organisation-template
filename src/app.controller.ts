import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

import { UserService } from './user/user.service';

import { CreateUserDto } from './user/dto/create-user.dto/create-user.dto';

@Controller('auth')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    let user = req.user;

    delete user.password;

    const tokken = await this.authService.generateToken(user);

    return { token: tokken, role: user.role };
  }

  @Post('/register')
  async register(@Request() req, @Body() CreateUserDto: CreateUserDto) {
    try {
      const user = await this.userService.getuser(CreateUserDto.email);

      if (user) {
        return { message: 'User already exists' };
      }
      if (user == null) {
        let newUser = await this.userService.createuser(CreateUserDto);

        delete newUser.password;

        const tokken = await this.authService.generateToken(newUser);

        return { token: tokken, role: newUser.role, newUser };
      }
    } catch (error) {
      console.log('cannot register user');
    }
  }
}
