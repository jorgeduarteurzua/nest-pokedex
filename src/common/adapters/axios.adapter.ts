import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

// Implementamps des la interfaz creada HttpAdapter
// utilizamos el Decorador @Injectable para poder utilizarlo en las otras clases
@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;
    // Implementamos la interfaz HttAdapter
    async get<T>(url: string): Promise<T> {

        try {
            const { data } = await this.axios.get<T>( url );
            return data;
            
        } catch (error) {
            
            throw new Error('This is an erro - Check logs');
        }
        
    }

}