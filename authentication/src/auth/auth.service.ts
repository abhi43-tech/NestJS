import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/user.dto';

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
    const payload = {user: user.username, sub: user.id}
    const access_token = this.jwtService.sign(payload, {secret: 'SECRET', expiresIn: '1m'});  
    const refresh_token = this.jwtService.sign(payload, { secret: 'REFRESH SECRET', expiresIn: '1d' })

    await this.userService.updateUser(user.id, refresh_token)

    return {
      access_token,  
      refresh_token
    }
  }

  async generateTokens(user: any) {
    const payload = {user: user.name, sub: user.id}  

    return {
      access_token: this.jwtService.sign(payload, {secret: 'SECRET', expiresIn: '1m'}),  
      // refresh_token: this.jwtService.sign(payload, { secret: 'REFRESH SECRET', expiresIn: '1d' })
    }
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
      const user = await this.userService.findEmail(googleUser.email);
      if(!user) return await this.userService.createGoogleUser(googleUser);
      
      return user;
    }
}
