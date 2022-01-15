import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserByToken(@Req() req) {
    try {
      return req.user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
