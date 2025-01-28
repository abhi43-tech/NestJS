import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Profile } from 'src/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Profile])],
  providers: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule {}
