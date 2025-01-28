import { Profile } from "src/profile/profile.entity";
import { Songs } from "src/songs/song.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  name: string;

  @ManyToOne(() => Profile, (profile) => profile.playlist, {
    cascade: ['insert'],
    // eager: true
  })
  profile: Profile;

  @ManyToMany(() => Songs, (song)=> song.playlist)
  songs: Songs[];
}