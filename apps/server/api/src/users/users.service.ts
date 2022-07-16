import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FindOneUserDto } from './dtos/find-one-user.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) { }

  async create({ username, password }: CreateUserDto) {
    const createdUser = new this.userModel({ username, password });
    return createdUser.save();
  }

  async getAll() {
    return this.userModel.find();
  }

  async findOne(attrs: Partial<FindOneUserDto>) {
    return this.userModel.findOne(attrs) ?? null;
  }

  async findOneById(id: number) {
    return this.userModel.findById(id);
  }

  async deleteOneById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
