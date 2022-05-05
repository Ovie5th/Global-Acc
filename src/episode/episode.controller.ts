import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CharacterService } from 'src/character/character.service';
import Episode from 'src/entities/episode.entity';
import { CreateEpisodeDto } from './episode.dto';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
    constructor(
        private readonly characterService: CharacterService,
        private readonly episodeService: EpisodeService,
      ) {}

    @Get()
    getEpisode(){
        return 'episodes'
    }

    @Get('/episodes')
    async getEpisodes(): Promise<Episode[]> {
      try {
        return await this.episodeService.getEpisodes();
      } catch (error) {
        throw new InternalServerErrorException(`Error getting episodes: ${error.message}`);
      }
    }

    @Post('/:characterId/episode')
  async createEpisode(
    @Param('characterId', ParseIntPipe) characterId: number,
    @Body() body: CreateEpisodeDto,
  ): Promise<Episode> {
    try {
      const character = await this.characterService.getSingleCharacter(characterId);
      const releaseDate = new Date();
      const { name, episodeCode } = body;
      return await this.episodeService.createEpisode(
        character,
        name,
        episodeCode,
        releaseDate,
      );
    } catch (error) {
      throw new InternalServerErrorException(`Error creating an episode: ${error.message}`);
    }
  }

}
