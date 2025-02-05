import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe)
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'login',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {maxAge: 3600000},
  //   })
  // )

  // app.use(passport.initialize())
  // app.use(passport.session())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
