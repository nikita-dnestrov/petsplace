import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {
    const user = new this.userModel({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
    await user.save();
    return user;
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });
    console.log(user);
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
      const { email, username, _id, status, products } = user;
      return {
        user,
        token: this.jwtService.sign(
          JSON.stringify({ email, username, _id, status, products })
        ),
      };
    } else {
      return { user: null, token: null };
    }
  }
}
