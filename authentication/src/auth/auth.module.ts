import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { sessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60sec' },
    }),
  ], // PassportModule.register({session: true})
  providers: [AuthService, LocalStrategy, JwtStrategy], // sessionSerializer
  exports: [AuthService],
})
export class AuthModule {}
