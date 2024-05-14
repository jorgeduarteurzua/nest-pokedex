import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definimos la Tabla a crear de Pokemon, debemos extender de Document de moongoose
// Usamos el decorador @Schema() de moongose para poder usar la estrcutura de Document

@Schema()
export class Pokemon extends Document {

    // id: string  --> No definimos el Id ya que es generado por mongoDB

    // definimos el nombre

    @Prop(
        {
            unique: true,   // Indicamos que debe ser un valor unico
            index: true     // Indicamos que debe tener un indice por name
        }
    )
    name: string;


    // Defnimos el Numero de Pokemon

    @Prop(
        {
            unique: true,   // Indicamos que debe ser un valor unico
            index: true     // Indicamos que debe tener un indice por no
        }
    )
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
