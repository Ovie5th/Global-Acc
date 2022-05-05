import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import Episode from './episode.entity';

  
  @Entity()
  export default class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 249, nullable: false })
    comment: string;

    @Column({ nullable: false })
    ipAddressLocation: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ManyToOne(() => Episode, episode => episode.comments, { eager: false })
    episode: Episode;
  }
  