import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import Episode from 'src/entities/episode.entity';
import Location from 'src/entities/location.entity';
import { Gender, Status } from '../enum/index.enum';

export default class CharacterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsOptional()
  stateOfOrigin:string

  @IsOptional()
  location:Location

  @IsOptional()
  episodes:Episode[]

}
