import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if(user && bcrypt.compare(password, user.password)) {
      const {password, ...rest} = user;
      return rest
    }

    return null;
  }

  async login(user: any) {
    const payload = {user: user.name, sub: user.id}

    return {
      access_token: this.jwtService.sign(payload, {secret: 'SECRET', expiresIn: '1m'}),  
      refresh_token: this.jwtService.sign(payload, { secret: 'REFRESH SECRET', expiresIn: '1d' })
    }
  }

  async generateTokens(user: any) {
    const payload = {user: user.name, sub: user.id}
    const accessToken = this.jwtService.sign(payload, {secret: 'SECRET', expiresIn: '1m'});
    const refreshToken = this.jwtService.sign({ payload }, { expiresIn: '7d', secret: 'REFRESH SECRET' });
    return { accessToken, refreshToken };
  }
}
