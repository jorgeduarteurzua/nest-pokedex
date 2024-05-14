import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  // Agregamos Inyeccion de Dependencias, solo se deben realizar en el cosntructor()
  constructor(

    // Definimos la Inyeccion de Dependencia
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>

  ){
    
  }


  // al usar las Inyecciones de Dependecias con Insecion en la BBDD se transforma en Asincorina por
  // lo tanto debemos agregar async
  async create(createPokemonDto: CreatePokemonDto) {

    // pasamos el name a minusculas
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      // Creamos la insercion en base al modelo definido en el constructor

      const pokemon = await this.pokemonModel.create(createPokemonDto);


      // cambiamos y devolvemos createPokemonDto, la idea es hacerlo en Services y no en Controllers
      //  return createPokemonDto;

      // Una vez agregamos el modelo devolvemos pokemon
      return pokemon;
    } catch(error){

        //console.log(error);
        /*
        {
          index: 0,
          code: 11000,
          keyPattern: { name: 1 },
          keyValue: { name: 'bulbasaur' },
          [Symbol(errorLabels)]: Set(0) {}
        }
        */

        // invocamos al metodo que maneja los errores
        this.handleExceptions(error) ;

    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  // Modificamos el metodo findOne para que devuelva los Datos Requeridos
  // 1ro lo transformamos -- > async
  async findOne(term: string) {

    // Definimos pokemon del tipo Pokemon
    let pokemon: Pokemon;

    // Verificamos si el id es un número, para buscar por id
    if ( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term})

    }

    // Busqueda por MongoId
    // Evaluamos que no exista un pokemon y que sea del tipo ObjectId
    if ( !pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term)
    }

    // Busqueda por Name
    // Si no hemos encontrado ningun pokemon con las condiciones anteriores buscamos por name
    if ( !pokemon ) {

      // usamos toLowerCase, ya que al grabar lo dejamos lowerCase
      pokemon = await this.pokemonModel.findOne({name : term.toLowerCase().trim()})
    }

    // Si no encontramos ningun pokemon
    if (!pokemon) {
      throw new NotFoundException(`Pokemon whith id, name or no "${term} not found"`)
    }

    //return `This action returns a #${id} pokemon`;
    return pokemon;
  }

  // Para actualizar debe ser async
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    // definimos una constante para que busque el term
    const pokemon = await this.findOne( term );

    // Verificamos si envia el name, para pasarlo a lower case
    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try{
      // De esta forma actualiza, pero no devuelve actualizado el JSON
      //await pokemon.updateOne( updatePokemonDto, { new: true});
      //return pokemon;


      await pokemon.updateOne( updatePokemonDto);
      
      // Retornamos lo actualizado, sobreescribimos pokemon con updatePokemonDto
      return {...pokemon.toJSON(), ...updatePokemonDto}
    } catch(error) {

      // invocamos al metodo que maneja los errores
      this.handleExceptions(error) ;
     }
    }


    
  }

  // Siempre que usamos await debe ir async
  async remove(id: string) {

    // (1) const pokemon = await this.findOne(id);

    // (1) Si no da error el findOne
    // (1) await pokemon.deleteOne();
    
    // (2) usamos otro metodos de Model para la eliminación

    // (2) const result =await this.pokemonModel.findByIdAndDelete(id);

    // (3) La eliminación la realizamos para verificar 1 sola vez en la BBDD si exsite el Id a Eliminar
    
    const {deletedCount}  = await this.pokemonModel.deleteOne({ _id : id});

    // Si deleteCount = 0, signidica que NO ELIMINO
    if (deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon whit id ${id} not found`);
    }

    // (1) return {id};

    // (2) return result;

    return;
  }

  // Creamos un metodo para el manejo de errores de tipo any (cualquiera)

  private handleExceptions(error : any) {

    if (error.code === 11000){
      throw new BadRequestException(`Pokemon exist en DB ${ JSON.stringify(error.keyValue)}`);
    }  

    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server Logs`);  
  }
}
