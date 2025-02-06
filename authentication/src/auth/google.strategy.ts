import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { privateDecrypt } from 'crypto';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOAuthConfig from 'src/config/google-oauth.config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private googleConfig: ConfigType<typeof googleOAuthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log(profile.emails[0].value)
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      username: profile.name.givenName,
      password: ""
    })
    console.log(user)
    done(null, user);
  }
}
