import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Episode from 'src/entities/episode.entity';
import Character from 'src/entities/character.entity';



@Injectable()
export class EpisodeService {
    constructor(
      @InjectRepository(Episode) private episodeRepository: Repository<Episode>,
      @InjectRepository(Character) private characterRepository: Repository<Character>
      
      ) {}

    getAll():Promise<Episode[]> {
      return  this.episodeRepository.find()
    }

    getOne(id:number):Promise<Episode>{
        return  this.episodeRepository.findOneOrFail(id)
    }

    async getEpisodes() {
      const builder = this.episodeRepository
        .createQueryBuilder('episodes')
        .leftJoinAndSelect('episodes.comments', 'comments')
        .loadRelationCountAndMap('episodes.commentsCount', 'episodes.comments')
        .orderBy('episodes.releaseDate', 'ASC');
  
      return await builder.getMany();
    }

    async createEpisode(
      character: Character,
      name: string,
      episodeCode: string,
      releaseDate: Date,
    ): Promise<Episode> {
      const data = {
        name,
        episodeCode,
        releaseDate,
      };
      const result = this.episodeRepository.create(data);
      
      character.episodes.push(result);
      await this.characterRepository.save(character);
  
      return await this.episodeRepository.save(result);
    }

    async getEpisode( episodeId: number): Promise<Episode> {
      const episode = await this.episodeRepository.findOne({ where: {id: episodeId}})
  
      if (!episode) {
        throw new NotFoundException(`Episode with ID: ${episodeId} not found`);
      }
  
      return episode;
    }
}
