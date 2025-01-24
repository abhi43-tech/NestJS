import { IsDefined, IsIn, IsNotEmpty, IsNumber, IsString, UUIDVersion } from "class-validator";

export class TaskDto {

  @IsDefined()
  @IsString()
  name: string;

  @IsIn(['open', 'in_progress', 'done'])
  @IsNotEmpty()
  status: string;

}