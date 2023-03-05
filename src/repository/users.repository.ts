import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../users/dtos/user.dto';
import { User } from './models/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findById(idHost: string): Promise<User> {
    return await this.userModel.findOne({ _id: idHost });
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const isEmailRepeat = await this.userModel.findOne({
      email: createUser.email,
    });
    if (isEmailRepeat) throw new BadRequestException('Email is repeat');
    const newUser = new this.userModel(createUser);
    return await newUser.save();
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, { $set: updateUser }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
