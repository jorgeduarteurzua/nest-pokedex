import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  
  // para agregar modulos usamos imports
  imports: [
     // Se agrega ConfigModule, para utilizar las variables de Entorno
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name ,
        schema: PokemonSchema
      }
    ])
  ],
  // Exportamos MongooseModule para poder usarlo en seed.module
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
