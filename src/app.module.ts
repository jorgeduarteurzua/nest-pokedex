import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    // Debemos Importar ServerStaticModule con CTRL + .
    ServeStaticModule.forRoot({
      // Debemos Importar join con CTRL + .
      rootPath: join(__dirname,'..','public'),
      }),

    // Conextamos a la BBDD de mongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), 
    PokemonModule, CommonModule
  ],
})
export class AppModule {}