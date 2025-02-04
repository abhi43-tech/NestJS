import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { PasswordService } from 'src/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService, PasswordService, JwtService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
