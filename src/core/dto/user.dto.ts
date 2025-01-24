import { IsString, IsEmail, IsDefined } from "class-validator";

export class UserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  username: string;
}

export class UserParamDto {
  @IsDefined()
  @IsString()
  email: string;
}