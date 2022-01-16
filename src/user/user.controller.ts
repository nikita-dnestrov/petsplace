import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  getUserByToken(@Req() req) {
    try {
      return this.userService.findUser(req.user._id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/username')
  updateUserNameByToken(@Req() req, @Body() body) {
    try {
      return this.userService.updateUser(req.user._id, { username: body.username });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/balance')
  updateUserBalanceByToken(@Req() req, @Body() body) {
    try {
      return this.userService.updateUserBalance(req.user._id, body.balance);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  updateUserAvatarByToken(@Req() req, @UploadedFile() file) {
    try {
      return this.userService.updateUserAvatar(req.user._id, file);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
