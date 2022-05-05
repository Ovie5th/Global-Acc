import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { CharacterService } from 'src/character/character.service';
import Location from 'src/entities/location.entity';
import { CreateLocationDto } from './location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {

    constructor(
        private readonly locationService: LocationService,
      ) {}


      @Post('/location')
      async createLocation(@Body() body: CreateLocationDto): Promise<Location> {
        try {
          const { name, longitude, latitude } = body;
          return await this.locationService.createLocation(name, longitude, latitude);
        } catch (error) {
          throw new InternalServerErrorException(`Error creating a location: ${error.message}`);
        }
      }

      @Get('/location')
        async getLocations(): Promise<Location[]> {
            try {
            return await this.locationService.getLocations();
            } catch (error) {
            throw new InternalServerErrorException(`Error getting locations: ${error.message}`);
            }
        }
}
