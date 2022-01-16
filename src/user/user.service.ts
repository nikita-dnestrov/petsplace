import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EUserStatus, User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  // async create() {
  //   const user = new this.user({
  //     username: 'kek',
  //     status: EUserStatus.ACTIVE,
  //     email: 'kek@test.com',
  //     password: 'gdehashblyat',
  //     products: [],
  //   });
  //   user.save();
  //   return user;
  // }

  async updateUser(id: string, data: Partial<UserDto>) {
    return await this.user.findByIdAndUpdate(id, data);
  }

  async updateUserBalance(id: string, deposit: number) {
    const found = await this.user.findById(id);

    return await this.user.findByIdAndUpdate(id, { balance: found.balance + deposit });
  }

  // async changeUserPassword(id: string, data: Partial<UserDto>) {
  //   return this.user.findByIdAndUpdate(id, data);
  // }
}
