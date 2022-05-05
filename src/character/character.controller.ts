
import {
    Body,
    ConflictException,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
import Character from 'src/entities/character.entity';
import { LocationService } from 'src/location/location.service';
  import { ParseIntPipe } from '../pipes/parseInt.pipes';
import CharacterDto from './character.dto';
import { CharacterService } from './character.service';
import { SortDto } from './sort.dto';
@Controller('character')
export class CharacterController {
    constructor(
        private readonly characterService: CharacterService,
        // private readonly locationService: LocationService,
      ) {}

    @Get('/characters')
    async getCharacters(@Query() filterDto: SortDto): Promise<Character[]> {
      try {
        return await this.characterService.getCharacters(filterDto)
      } catch (error) {
        throw new InternalServerErrorException(`Error getting characters: ${error.message}`);
      }
    }

    @Post('/:locationId/character')

//   async createCharacter(
//     @Param('locationId', ParseIntPipe) locationId: number,
//     @Body() body: CharacterDto,
//   ): Promise<Character> {
//     try {
//       const location = await this.locationService.getLocation(locationId);
//       return await this.characterService.createCharacter(
//         body,
//         location,
//       );
//     } catch (error) {
//       if(error.code === 'ER_DUP_ENTRY') {
//         throw new ConflictException('A character can only be at a location')
//       } else {
//         throw new InternalServerErrorException(`Error creating a character: ${error.message}`);
//       }
//     }
//   }

    @Get('/:characterId/character')
  async getCharacter(@Param('characterId', ParseIntPipe) characterId: number): Promise<Character> {
    try {
      return await this.characterService.getSingleCharacter(characterId);
    } catch (error) {
      throw new InternalServerErrorException(`Error getting a character: ${error.message}`);
    }
  }

}
