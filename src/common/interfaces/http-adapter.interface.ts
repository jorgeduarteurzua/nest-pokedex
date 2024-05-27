
// Definimos la interface a utilizar

export interface HttpAdapter {

    // Definimos los métodos que contendra, para nuestro caso crearemos get()
    // Definimos de tipo Generica <T>
    
    get<T>( url: string) : Promise<T>;
}