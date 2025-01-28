import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SongService } from "./song.service";
import { createSongDto, updateSongDto } from "./dto/song.dto";

@Controller('song')
export class SongController{

  constructor(private readonly songService: SongService) {}

  @Get()
  async getAllSong() {
    return await this.songService.getSongs()
  }

  @Get(':id')
  async getSong(@Param('id') id: number) {
    return await this.songService.getSong(id)
  }

  @Post() 
  async createSong(@Body() song: createSongDto) {
    return await this.songService.createSong(song)
  }

  @Delete(':id')
  async deleteSong(@Param('id') id: number) {
    return await this.songService.deleteSong(id);
  }

  @Put(':id')
  async updateSong(@Param('id') id:number, @Body() song: updateSongDto) {
    return await this.songService.updateSong(id, song);
  }
}