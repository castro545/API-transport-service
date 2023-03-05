import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserRepository } from '@/repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto) {
    return this.userRepository.create(user);
  }

  update(id: string, changes: UpdateUserDto) {
    return this.userRepository.update(id, changes);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }
}
