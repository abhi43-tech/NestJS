import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  Body
} from '@nestjs/common';
import { LocalGuard } from '../auth/local-auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshGuard } from 'src/auth/refresh.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { GoogleGuard } from 'src/auth/google.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { access_token, refresh_token } = await this.authService.login(req.user);
  
    res.cookie('Access', access_token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 10000
    });
    res.cookie('Refresh', refresh_token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 3600
    })
    res.send('Logged In.')
  }

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const { access_token } = await this.authService.generateTokens(req.user);
  
    res.cookie('Access', access_token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 100000
    });

    // const payload = this.jwtService.verify(refreshToken, { secret: "REFRESH SECRET" });
    return res.json({access_token});
  }

  @UseGuards(GoogleGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Response() res) {
    const Response = await this.authService.login(req.user)
    res.redirect("http://localhost:4000")
  }
}
