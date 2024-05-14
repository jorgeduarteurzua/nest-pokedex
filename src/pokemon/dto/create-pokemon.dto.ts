import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    // Vamos a validar el tipo de Datos antes de realizar el POST

    // isInt, isPositive, min = 1, para usar los decoradores debemos instalar --> yarn add class-validator class-transformer
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, minLegth = 1
    @IsString()
    @MinLength(1)
    name: string;
}
