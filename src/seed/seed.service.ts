import { Injectable } from '@nestjs/common';
//import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
 

  // definimos la instancia de axios, previa instalación --> yarn add axios
  // la definicion la traspasamos a axios.adapter.ts
  // private readonly axios: AxiosInstance = axios;

  constructor(
      // Definimos la Inyeccion de Dependencia
      @InjectModel( Pokemon.name )
      private readonly pokemonModel: Model<Pokemon>,

      // Incporamos el Adapter Creado
      private readonly http : AxiosAdapter,

  ){


  }
  async executeSeed(){

    // Antes de hacer cualquier inserción Borramos todos los registros
    await this.pokemonModel.deleteMany();

    // usaremos AXIOS para realizar las peticiones HTTP en vez de FETCH
    //console.log( fetch );

    // realizamos el get a la url que se requiere
    
    // Con uso de axios
    // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // Con uso de Provider creado
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    
    // Para realizar insercione simultaneas (1)
    // (1) const insertPromisesArray = [];

    // Otra forma de realizar inserciones simultaneas (2)
    const pokemonToInsert : { name: string, no: number}[] = [];
    // realizamos forEach destrcutruando name y url que son los campos que requrimos en este caso
    // eliminamos async ya que usamos array para insercion de registros
    data.results.forEach(({name, url}) => {

      //console.log({name, url});
      const segments = url.split('/');

      // console.log(segments);
      // [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]

      // recatamos el numero del Pokemon, y lo casteamos a number con +
      const no = +segments[ segments.length - 2];

      // Para usar pokemonModel, se deben haber exportado e importado en pokemon.module y see.module
      //const pokemon = await this.pokemonModel.create({name, no});

      // (1)
      // Para realizar inserciones simulataneas
      // insertPromisesArray.push(
      //  this.pokemonModel.create({name, no})
      // );

      // (2)
      pokemonToInsert.push({name, no});

      // console.log({name, no});
      // { name: 'bulbasaur', no: 1 }

    });

    // para insertar usamos una promesa (1)
    //await Promise.all( insertPromisesArray );

    // (2)
    await this.pokemonModel.insertMany( pokemonToInsert );
    // retornamos el data
    return 'Seed executed';
  }
}
