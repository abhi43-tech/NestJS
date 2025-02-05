

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

  name?: string;

  username: string;

  email: string;

  password: string;
}