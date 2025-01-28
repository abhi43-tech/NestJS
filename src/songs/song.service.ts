import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './song.entity';
import { DataSource, Repository } from 'typeorm';
import { createSongDto, updateSongDto } from './dto/song.dto';
import { platform } from 'os';
import { Playlist } from 'src/playlist/playlist.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Songs) private songRepo: Repository<Songs>,
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
  ) {}

  public async getSongs(): Promise<Songs[]> {
    return await this.songRepo.find();
  }

  public async getSong(id:number): Promise<Songs> {
    return await this.songRepo.findOne({where: {id}});
  }

  public async createSong(songDto: createSongDto) {
    const song = this.songRepo.create(songDto);
    if (songDto.playlist && songDto.playlist.length > 0) {
      const playlists = await this.playlistRepo.findByIds(
        songDto.playlist.map((playlist) => playlist.id),
      );

      if (playlists.length !== songDto.playlist.length) {
        throw new BadRequestException(
          'One or more playlists are not created with the given IDs.',
        );
      }

      song.playlist = playlists;
    }

    return await this.songRepo.save(song);
  }

  public async deleteSong(id: number) {
    const song = await this.songRepo.findOne({
      relations: { playlist: true },
      where: { id },
    });

    return await this.songRepo.remove(song);
  }

  public async updateSong(id: number, songDto: updateSongDto) {
    const song = await this.songRepo.findOne({
      relations: { playlist: true },
      where: { id },
    });

    if (!song) throw new BadRequestException('Song not found');

    Object.assign(song, songDto);

    if (songDto.playlist && songDto.playlist.length > 0) {
      const playlists = await this.playlistRepo.findByIds(
        songDto.playlist.map((playlist) => playlist.id),
      );

      if (playlists.length !== songDto.playlist.length) {
        throw new BadRequestException(
          'One or more playlists are not created with the given IDs.',
        );
      }

      song.playlist = playlists;
    }

    return await this.songRepo.save(song);
  }
}

// {
//   "title": "My Song",
//   "duration": "00:03:15",
//   "playlist": [
//     {
//       "id": 1
//     },
//     {
//       "id": 2
//     }
//   ]
// }
