
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, Status } from '../enum/index.enum';
import Episode from './episode.entity';
import Location from './location.entity';

@Entity()
export default class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @OneToOne(() => Location, location => location.character, { eager: true })
  @JoinColumn()
  location: Location

  @Column({ nullable: false, type: 'enum', enum: Status })
  status: Status;

  @Column({ nullable: false, type: 'enum', enum: Gender })
  gender: Gender;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created: Date;
  
  @ManyToMany(() => Episode, episodes => episodes.characters, {eager: true})
  @JoinTable()
  episodes: Episode[]
}
