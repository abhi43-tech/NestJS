import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    // @UseGuards(AuthenticatedGuard)
    @UseGuards(JwtGuard)
    @Get('protected')
    getHello(@Request() res): string {
      return res.user;
    }
}

// constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalGuard)
//   @Post('login')
//   login(@Request() req) {
//     return this.authService.login(req.user);
//   }

//   // @UseGuards(AuthenticatedGuard)
//   @UseGuards(JwtGuard)
//   @Get('protected')
//   getHello(@Request() res): string {
//     return res.user;
//   }
