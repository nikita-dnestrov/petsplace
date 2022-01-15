import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async registerUser(@Body() body: RegisterDto) {
    try {
      return this.authService.register(body);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post('sign-in')
  async loginUser(@Body() body: LoginDto) {
    try {
      return this.authService.login(body);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Req() req) {
    return req.user;
  }
}
