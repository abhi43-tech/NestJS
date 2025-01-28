import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dot';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return await this.userRepo.find(); // { relations: { profile: true } }
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    user.profile = user.profile ?? {};
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOneBy({ id });
  }

  async updateUser(id: number, newData: CreateUserDto) {
    return await this.userRepo.update(id, newData);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user) {
      // Work with uni direction relation
      // await this.userRepo.remove(user);
      // await this.profileRepo.delete(user.profile.id)

      // work with bi direction relation
      const profile = await this.profileRepo.findOne({ where: {id: user.profile.id}})
      await this.profileRepo.remove(profile)

      return {"Detele": "Successful"}
    }
    return null;
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
