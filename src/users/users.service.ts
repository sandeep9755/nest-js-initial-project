import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../common/base/base.service';
import { BaseException } from '../common/exceptions/base.exception';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    super(userRepo);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email }, select: ['id', 'name', 'email', 'password'] });
    if (!user) throw BaseException.notFound(`User not found with email: ${email}`);
    return user;
  }
}
