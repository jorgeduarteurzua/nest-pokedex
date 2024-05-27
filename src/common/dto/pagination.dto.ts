import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    // Deinimos los campos a utilizar y definimos sus validaciones
    // Definimos los campos como Opcional (?), Positivo y valor minimo como 1

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;

}