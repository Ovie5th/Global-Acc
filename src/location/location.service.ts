import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Location from 'src/entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) {}

    getAll():Promise<Location[]> {
      return  this.locationRepository.find()
    }

    async createLocation(name: string, longitude: number, latitude: number): Promise<Location> {
        const location = this.locationRepository.create({ name, longitude, latitude });
        return await this.locationRepository.save(location);
    }

    async getLocations(): Promise<Location[]> {
        return await this.locationRepository.find();
    }

    async getLocation(locationId: number): Promise<Location> {
        const location = await this.locationRepository.findOne({ where: { id: locationId } });
        if(!location) {
          throw new NotFoundException(`Location with ID "${locationId}" not found`);
        }
        return location;
      }
}
