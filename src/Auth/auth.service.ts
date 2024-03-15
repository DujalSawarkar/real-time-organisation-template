import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONSTANTS } from 'src/Constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user) {
    console.log('authservice generate token', user);

    return await this.jwtService.sign(
      { user },
      { secret: CONSTANTS.secretKey },
    );
  }
}
