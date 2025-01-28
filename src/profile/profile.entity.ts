import { Playlist } from 'src/playlist/playlist.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 10,
  })
  gender: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dateofBirth: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profileImage: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Playlist, (playlist) => playlist.profile)
  playlist: Playlist[];
}
