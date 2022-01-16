import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  getUserByToken(@Req() req) {
    try {
      return req.user;
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
}
