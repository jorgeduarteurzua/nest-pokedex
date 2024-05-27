
// Importamos todo el paquete joi
import * as Joi from "joi";

// creamos exportacion de Validacion de Esquema
export const JoinValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
})