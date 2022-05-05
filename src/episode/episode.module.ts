import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from 'src/character/character.service';
import Character from 'src/entities/character.entity';
import Episode from 'src/entities/episode.entity';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), TypeOrmModule.forFeature([Character])],
  controllers: [EpisodeController],
  providers: [CharacterService, EpisodeService]
})
export class EpisodeModule {}
