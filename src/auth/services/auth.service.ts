import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/services/users.service';
import { IUserLogin } from '../interfaces/login.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    private usersService: UsersService,
  ) { }

  async validateUserCredentials(credentials: IUserLogin): Promise<any> {
    const user = await this.usersService.getUserByEmail(credentials.email);
    if (user && compare(user.password, credentials.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      user,
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
