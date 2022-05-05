import { Module } from '@nestjs/common';
import { EpisodeModule } from './episode/episode.module';
import { CharacterModule } from './character/character.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import config from 'ormconfig';


@Module({
  imports: [ TypeOrmModule.forRoot(config), EpisodeModule,  CharacterModule,  CommentModule, LocationModule],
  
})
export class AppModule {}
