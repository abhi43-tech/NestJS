import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { ProfileModule } from './profile/profile.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongModule } from './songs/song.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test')
          .default('test'),
        db_type: Joi.string().valid('mysql').default('mysql'),  
        db_host: Joi.string().hostname().default('localhost'),  
        db_port: Joi.number().port().default(3306),  
        db_username: Joi.string().default('root'),  
        db_password: Joi.string().default(''),  
        db_database: Joi.string().default('exercise'), 
      }),
      
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],  
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('database.db_type') as any,
        host: configService.get<string>('database.db_host'),
        port: configService.get<number>('database.db_port'),
        username: configService.get<string>('database.db_username'),
        password: configService.get<string>('database.db_password'),
        database: configService.get<string>('database.db_database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UserModule,
    ProfileModule,
    PlaylistModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly config: ConfigService) {
    console.log(this.config.get<String>('node_env'))
  }
}

