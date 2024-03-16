import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'user_id' });
  }

  async validate(user_id: number, password: string) {
    const user = await this.userService.getuserbyid(user_id);
    if (user === undefined || user == null) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(password, user.password);
    if (user != undefined && isMatch) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
