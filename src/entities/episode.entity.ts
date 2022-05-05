import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Character from './character.entity';
import Comments from './comment.entity';

  
  @Entity()
  export default class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    episodeCode: string;

    @Column()
    releaseDate: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @OneToMany(() => Comments, comments => comments.episode, { eager: true })
    comments: Comments[]
    commentsCount: number;

    @ManyToMany(() => Character, characters => characters.episodes, {eager: false})
    characters: Character[]
  }
