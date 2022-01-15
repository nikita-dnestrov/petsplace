import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EUserStatus, User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async create() {
    const user = new this.user({
      username: 'kek',
      status: EUserStatus.ACTIVE,
      email: 'kek@test.com',
      password: 'gdehashblyat',
      products: [],
    });
    user.save();
    return user;
  }
}
