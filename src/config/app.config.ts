
// Vamos a devolver un objetos con las Variables de Entorno
export const EnvConfiguration = () => ({

    // Definimos la variable environment, tomando NODE_ENV, en caso de no existir se asigna 'dev'
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    // Si no se espeficia PORT se asigna 3002 por defecto
    port: process.env.PORT || 3002,
    // Si no se espeficia DEFAULT_LIMIT se asigna 7 por defecto
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})