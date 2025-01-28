import { Module } from "@nestjs/common";
import { SongService } from "./song.service";
import { SongController } from "./song.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Songs } from "./song.entity";
import { Playlist } from "src/playlist/playlist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Songs, Playlist])],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}