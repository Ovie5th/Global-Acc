import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import Episode from "src/entities/episode.entity";



export default class CommentDto {
    @IsString()
    @IsNotEmpty()
    comment: string;
  }

export class CreateCommentDto{
    @IsString()
    @Length(1,249)
    @IsNotEmpty()
    comment:string

    @IsOptional()
    episode:Episode

    @IsNotEmpty()
    @IsString()
    ipAddressLocation:string
}