import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({

    // Agregamos la interfaz creada
    providers : [ AxiosAdapter],

    // Dejamos visible para que otros
    exports : [ AxiosAdapter]
})
export class CommonModule {}
