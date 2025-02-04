import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService, PaginationService],
})
export class UserModule {
  constructor(public dataSource: DataSource) {}
}
