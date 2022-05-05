import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender,  Status } from '../enum/index.enum';

export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC'
  }

export class SortDto {

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(Sort)
  sortKey?: Sort;

  @IsOptional()
  @IsString()
  sortValue?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
 
}
