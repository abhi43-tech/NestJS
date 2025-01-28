import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { createPlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  public getPlaylist() {
    return this.playlistRepo.find({
      relations: {
        profile: true
      }
    });
  }

  public async createPlaylist(playlistDto: createPlaylistDto) {
    const profile = await this.profileRepo.findOne({
      where: { id: playlistDto.profile.id },
    });
    if (profile) {
      const playlist = this.playlistRepo.create(playlistDto);
      return  await this.playlistRepo.save(playlist);
    }
    throw new BadRequestException('Give valid profile ID.')
  }
}
