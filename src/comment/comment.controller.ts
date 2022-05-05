import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import axios from 'axios';
import { CharacterService } from 'src/character/character.service';
import Comment from 'src/entities/comment.entity';
import Episode from 'src/entities/episode.entity';
import { EpisodeService } from 'src/episode/episode.service';
import CommentDto from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly characterService: CharacterService,
        private readonly commentService: CommentService,
        private readonly episodeService: EpisodeService,
      ) {}


    @Post('/episode/:episodeId/comment')
    async createComment(
      @Param('characterId', ParseIntPipe) characterId: number,
      @Param('episodeId', ParseIntPipe) episodeId: number,
      @Body() body: CommentDto
    ): Promise<Comment>{
      try {
        await this.characterService.getSingleCharacter(characterId);
      const episode = await this.episodeService.getEpisode( episodeId);
      const { comment } = body;
  
      const { data } = await axios.get('https://api.ipify.org/?format=json');
      const ipAddressLocation = data.ip
      
      return await this.commentService.createComment(
        episode,
        ipAddressLocation,
        comment,
      );
      } catch (error) {
        throw new InternalServerErrorException(`Error making a comment: ${error.message}`);
      }
    }

    @Get('/episode/:episodeId/comments')
  async getComments(
    @Param('episodeId', ParseIntPipe) episodeId: number
  ): Promise<Episode> {
    try {
      return await this.episodeService.getEpisode( episodeId);  
    } catch (error) {
      throw new InternalServerErrorException(`Error getting comments: ${error.message}`);
    }
  }
}
