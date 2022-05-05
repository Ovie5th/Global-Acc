import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from 'src/character/character.service';
import Character from 'src/entities/character.entity';
import Comment from 'src/entities/comment.entity';
import Episode from 'src/entities/episode.entity';
import { EpisodeService } from 'src/episode/episode.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';


@Module({
  imports: [TypeOrmModule.forFeature([Comment, Episode, Character])],
  controllers: [CommentController],
  providers: [CharacterService, EpisodeService, CommentService]
})
export class CommentModule {}
