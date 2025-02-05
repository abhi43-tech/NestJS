import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // console.log("Cookies in request:", req.cookies);
          return req.cookies?.Refresh;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'REFRESH SECRET',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const user = await this.userService.findToken(req.cookies?.Refresh);
    if(!user) throw new BadRequestException('Refresh Token is not valid');
    return {
      id: user.id,
      name: user.username
    };
  }
}
