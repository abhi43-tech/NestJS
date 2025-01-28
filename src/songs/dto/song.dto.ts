import { IsDateString, IsNotEmpty, IsOptional, IsString, IsTimeZone } from "class-validator";
import { Playlist } from "src/playlist/playlist.entity";

export class createSongDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsOptional()
  duration: Date;

  @IsOptional()
  playlist: Playlist[];
}

export class updateSongDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  duration?: Date;

  @IsOptional()
  playlist?: Playlist[];
}
