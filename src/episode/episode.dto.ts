import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import Character from "src/entities/character.entity";
import Comment from "src/entities/comment.entity";



export class CreateEpisodeDto{

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    episodeCode:string

    @IsOptional()
    comments:Comment

    @IsOptional()
    characters:Character[]

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    releaseDate:Date

   
}