<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el Repositorio

2. Ejecutar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4.- Levantar la Base de Datos
```
docker-compose up -d
```
5.- Clonar el archivo ```__.env.template__``` y renombrar la copia a ```.env```

6.- Llenar las variables de entorno definidas en ```.env```

7.- Ejecutar la aplicación en dev:
```
yarn start:dev
```

8.- Recargar o recostruir Data (semilla)
```
http://localhost:3000/api/v2/seed
```

## Stack Usado
* MongoDB
* Nest
