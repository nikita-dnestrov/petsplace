import { Types } from 'mongoose';
import { EUserStatus } from 'src/schemas/user.schema';

export class UserDto {
  username: string;
  status: EUserStatus;
  email: string;
  password: string;
  products: Types.ObjectId[];
  balance: Number;
}
