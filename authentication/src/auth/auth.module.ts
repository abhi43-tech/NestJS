import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { sessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshGuard } from './refresh.guard';
import { JwtRefreshStrategy } from './refresh.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOAuthConfig from 'src/config/google-oauth.config';


@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60sec' },
    }),
    ConfigModule.forRoot({
      load: [googleOAuthConfig], // Ensure config is loaded
      isGlobal: true, // Makes ConfigModule available globally
    }),
  ], // PassportModule.register({session: true})
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy], // sessionSerializer
  exports: [AuthService],
})
export class AuthModule {}
