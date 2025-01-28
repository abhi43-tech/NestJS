import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { createPlaylistDto } from './dto/playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  async getAllProfile() {
    return await this.playlistService.getPlaylist();
  }

  @Post()
  async createPlaylist(@Body() playlist: createPlaylistDto) {
    return await this.playlistService.createPlaylist(playlist);
  }
}
