import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dot';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(@Query('id') id: number) {
    if(id) return this.userService.findOne(id);
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id:number, @Body() user: CreateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:number) {
    return this.userService.deleteUser(id);
  }
}
