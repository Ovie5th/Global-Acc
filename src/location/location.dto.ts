import {IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class CreateLocationDto{

    @IsString()
    @IsNotEmpty()
    name:string

    @IsNumber()
    @IsNotEmpty()
    latitude:number

    @IsNumber()
    @IsNotEmpty()
    longitude:number
}