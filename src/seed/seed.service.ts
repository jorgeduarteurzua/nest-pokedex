import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
 

  // definimos la instancia de axios, previa instalación --> yarn add axios
  private readonly axios: AxiosInstance = axios;

  async executeSeed(){

    // usaremos AXIOS para realizar las peticiones HTTP en vez de FETCH
    //console.log( fetch );

    // realizamos el get a la url que se requiere
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    // realizamos forEach destrcutruando name y url que son los campos que requrimos en este caso
    data.results.forEach(({name, url}) => {

      //console.log({name, url});
      const segments = url.split('/');

      // console.log(segments);
      // [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]

      // recatamos el numero del Pokemon, y lo casteamos a number con +
      const no = +segments[ segments.length - 2];

      // console.log({name, no});
      // { name: 'bulbasaur', no: 1 }

    })
    // retornamos el data
    return data.results;
  }
}
