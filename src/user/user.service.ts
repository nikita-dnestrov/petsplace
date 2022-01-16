import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';
const ImageKit = require('imagekit');

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findUser(id: string) {
    return await this.user.findById(id);
  }

  async updateUser(id: string, data: Partial<UserDto>) {
    return await this.user.findByIdAndUpdate(id, data);
  }

  async updateUserBalance(id: string, deposit: number) {
    const found = await this.user.findById(id);

    return await this.user.findByIdAndUpdate(id, { balance: found.balance + deposit });
  }

  async updateUserAvatar(id: string, file: any) {
    const kit = new ImageKit({
      publicKey: 'public_wUjnhpIQcdnCoNN7ZWSAspmkGvA=',
      privateKey: 'private_R8ORWzyNCjDBJuie3N1fr05XFsQ=',
      urlEndpoint: 'https://ik.imagekit.io/et5tweaufke',
    });

    const kek = await kit.upload({
      file: file.buffer.toString('base64'),
      fileName: `avatar_${id}.jpg`,
    });

    return await this.user.findByIdAndUpdate(id, { avatar: kek.url }, { new: true });
  }

  // async changeUserPassword(id: string, data: Partial<UserDto>) {
  //   return this.user.findByIdAndUpdate(id, data);
  // }
}
