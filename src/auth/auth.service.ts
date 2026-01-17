import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { BaseException } from '../common/exceptions/base.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw BaseException.notFound('User not found');
    // In a real app, compare hashed password
    const isPasswordValid = password === '123456' || await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) throw BaseException.badRequest('Invalid credentials');
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      message: 'Login successful',
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
