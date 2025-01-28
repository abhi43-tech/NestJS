import { Playlist } from "src/playlist/playlist.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Songs {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  title: string;

  @Column({
    type: 'time',
    nullable: true
  })
  duration: Date;

  @CreateDateColumn()
  release_date: Date;

  @ManyToMany(() => Playlist,(playlist) => playlist.songs , {
    cascade : true
  })
  @JoinTable()
  playlist: Playlist[];
}