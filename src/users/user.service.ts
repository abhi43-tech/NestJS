import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dot';
import { Profile } from 'src/profile/profile.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/paginate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private dataSource: DataSource,
    private readonly paginateService: PaginationService,
  ) {}

  public async getUsers(id?: number, paginate?: PaginationDto) {
    if (id) {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not Found.');
      return user;
    }

    // return await this.userRepo.find(); // { relations: { profile: true } }
    return await this.paginateService.paginateData(paginate);
  }

  public async createUser(user?: CreateUserDto) {
    user.profile = user.profile ?? {};
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser = queryRunner.manager.create(User, user);
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateUser(id: number, newData: CreateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not Found.');
    return await this.userRepo.update(id, newData);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user) {
      // Work with uni direction relation
      // await this.userRepo.remove(user);
      // await this.profileRepo.delete(user.profile.id)

      // work with bi direction relation
      const profile = await this.profileRepo.findOne({
        where: { id: user.profile.id },
      });
      await this.profileRepo.remove(profile);

      return { Detele: 'Successful' };
    }
    if (!user) throw new NotFoundException('User not Found.');
  }
}

// without cascading

// public async createUser(user: CreateUserDto): Promise<User> {
//   user.profile = user.profile ?? {};
//   let newProfile = this.profileRepo.create(user.profile)
//   await this.profileRepo.save(newProfile)

//   const newUser = this.userRepo.create(user)
//   newUser.profile = newProfile;
//   return await this.userRepo.save(newUser);
// }
