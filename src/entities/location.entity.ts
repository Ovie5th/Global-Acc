import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Character from './character.entity';

  
  @Entity()
  export default class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({
      type: 'double'
    })
    longitude: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @OneToOne(() => Character, character => character.location, { eager: false })
    character: Character;

    @Column({
      type: 'double', nullable: false
    })
    latitude: number;

  }
  