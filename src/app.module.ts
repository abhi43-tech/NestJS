import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { ProfileModule } from './profile/profile.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongModule } from './songs/song.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'exercise',
        // entities: [User, Playlist, Song, Profile],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    ProfileModule,
    PlaylistModule,
    SongModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
