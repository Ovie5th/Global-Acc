import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Character from 'src/entities/character.entity';
import Location from 'src/entities/location.entity';
import { Repository } from 'typeorm';
import CharacterDto from './character.dto';
import { SortDto } from './sort.dto';

@Injectable()
export class CharacterService {
    constructor(@InjectRepository(Character) private characterRepository: Repository<Character>) {}

    getAll():Promise<Character[]> {
      return  this.characterRepository.find()
    }

    async getSingleCharacter(id: number): Promise<Character> {
        const characterObject = await this.characterRepository.findOne({
          where: { id },
        });
        if (!characterObject) {
          throw new NotFoundException(`Character does not exist`);
        }
    
        return characterObject;
      }

    async getCharacters(sortDto:SortDto){
        const { sortValue, location, gender, status, sortKey,  } = sortDto;
        const query = this.characterRepository
          .createQueryBuilder('character')
          .innerJoinAndSelect('character.location', 'location');
    
          if (location) {
            query.andWhere('location.name = :location', { location });
        }
        
        if (status) {
            query.andWhere('character.status = :status', { status });
        }
    
        if (gender) {
            query.andWhere('character.gender = :gender', { gender });
        }
    
        if (sortKey && sortValue === 'gender') {
            query.orderBy('character.gender', sortKey);
        }else if ( sortKey && sortValue === 'location' ) {
            query.orderBy('location.name', sortKey);
        }
    
        return await query.getMany();
    }

    async createNewCharacter(
        body: CharacterDto,
        location: Location
      ): Promise<Character> {
        
        const characterBody = this.characterRepository.create({
          firstName: body.firstName,
          lastName: body.lastName,
          gender: body.gender,
          status: body.status,
        });
        characterBody.location = location;
    
        return this.characterRepository.save(characterBody);
      }
    


}
