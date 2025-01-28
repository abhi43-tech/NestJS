import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Profile } from "src/profile/profile.entity";
import { IsNull } from "typeorm";


export class createPlaylistDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  profile: {id: number}
}