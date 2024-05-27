import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoinValidationSchema } from './config/joi.validation';


@Module({
  imports: [

    // Agregamos ConfigModule para las Variables de Entorno
    ConfigModule.forRoot({
      // Cargamos el el Archivo de Configuración de variables de entorno
      load: [ EnvConfiguration ],
      // Agregamos validationSchema
      validationSchema: JoinValidationSchema,
    }),
    // Debemos Importar ServerStaticModule con CTRL + .
    ServeStaticModule.forRoot({
      // Debemos Importar join con CTRL + .
      rootPath: join(__dirname,'..','public'),
      }),

    // Conextamos a la BBDD de mongoDB
    //MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), 
   
    // Usamos la Variable de Entorno
    MongooseModule.forRoot( process.env.MONGODB, {
      // asginamos en nombre de la BBDD que queremos
      dbName: 'pokemonsdb'
    }), 

    PokemonModule, CommonModule, SeedModule
  ],
})
export class AppModule {

}
