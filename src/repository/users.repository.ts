import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../users/dtos/user.dto';
import { User } from './models/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) { }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findById(idHost: string): Promise<User> {
    return await this.userModel.findOne({ _id: idHost });
  }

  async create(): Promise<User> {
    const emailFaker = faker.internet.email();
    const newUser = new this.userModel({
      email: emailFaker,
      password: faker.internet.password(),
      name: faker.name.fullName(),
      creditCards: [],
    });
    console.log('user', newUser)
    return await newUser.save();
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
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
