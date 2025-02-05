import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { PasswordService } from 'src/password/password.service';
import { JwtService } from '@nestjs/jwt';
import googleOAuthConfig from 'src/config/google-oauth.config';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from 'src/auth/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), ConfigModule.forFeature(googleOAuthConfig)],
  providers: [UserService, PasswordService, JwtService, GoogleStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
