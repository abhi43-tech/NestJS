import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { LocalGuard } from '../auth/local-auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtGuard)
  @Get('protected')
  getHello(@Request() res): string {
    return res.user;
  }

  @Post('refresh')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    const payload = this.jwtService.verify(refreshToken);
    return await this.authService.generateTokens(payload);
  }
}
