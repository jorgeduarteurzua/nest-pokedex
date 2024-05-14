import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(200) // En vez de devolver 201, devolvemos 200
  //@HttpCode( HttpStatus.OK) // tambien podemos usar HttpStatus que posee todos los codigo válidos
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {

    // usamos +, para transformar a numero
    //return this.pokemonService.findOne(+id);

    // Modificamos metodo findOne para que NO solo busque por Id
    return this.pokemonService.findOne(term);
  }

  // Actualizar
  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term , updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
