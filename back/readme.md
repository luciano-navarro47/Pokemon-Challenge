![](assets/Instrucciones.jpg)

## Migraciones

Este proyecto utiliza TypeORM para manejar migraciones de base de datos y popular una tabla.

### Ejecutar migraciones

Este comando aplica las migraciones pendientes en el proyecto.
Crea o actualiza una tabla en la base de datos llamada ```migrations``` para llevar un registro de las migraciones que se aplicaron.
Esto aplicará los cambios al archivo pokemon.db. Por ejemplo: poblar la base de datos

```
npm run migration:run
```

### Crear una nueva migración (comando Opcional)

Este comando crea un nuevo archivo de migración en la carpeta ```src/migrations```
Dentro de ese archivo llamado "InitPokemon" se definió la estructura de la tabla y la inserción de los pokémones.

```
npm run migration:create
```

### Generar una nueva migración (comando Opcional)

Este comando genera un nuevo archivo de migración con los cambios detectados en las entidades:

```
npm run migration:generate
```

### Revertir cambios recientes en la DB (comando Opcional)

Este comando deshace la última migración que se aplicó revirtiendo los cambios en la base de datos.

```
npm run migration:revert
```

## Levantar el Backend con NestJS
Ejecutar en la terminal el siguiente comando: ```npm run start:dev```

## Tests
Ejecutar en la terminal el siguiente comando para testear la funcionalidad de los endpoints  ```pokemon.controller``` y ```battle.controller```

```
npm run test
```

## Endpoints

#### Obtener todos los Pokémons

Implementar un endpoint que devuelve al frontend un arreglo (lista) con todos los pokémones existentes en la base de datos.

Tipo de solicitud: GET 
```
http://localhost:3000/pokemon
```
#### Ejemplo de respuesta
```
[
    {
        "id": "pokemon-1",
        "name": "Pikachu",
        "attack": 4,
        "defense": 3,
        "hp": 3,
        "speed": 6,
        "type": "Electric",
        "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    },
    ...
]
```

- Código de estado HTTP esperado (200 OK)

### Iniciar batalla 1vs1
Implementar un endpoint que simula una batalla entre dos Pokémons recibiendo sus IDs por body. El resultado de la batalla se calcula en base a sus stats y efectividad de tipo. Esta batalla concluirá cuando unos de los dos pokémons llegue primero a tener 0 puntos de HP. Al finalizar la batalla se guardará la información del ganador y perdedor en una tabla en la base de datos y le devuelve al front un objeto JSON con los datos del ganador.

Tipo de solicitud: POST
```
http://localhost:3000/battle
```

#### Request body

```
{
  "pokemon1Id": "pokemon-4",
  "pokemon2Id": "pokemon-2"
}
```
+ pokemon1Id: ID del Pokémon seleccionado por el usuario.

+ pokemon2Id: ID aleatorio del segundo Pokémon.

#### Ejemplo de respuesta
```
{
    "winner": {
        "id": "pokemon-4",
        "name": "Bulbasur",
        "attack": 4,
        "defense": 3,
        "hp": 2,
        "speed": 3,
        "type": "Grass",
        "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
    }
}
```

- Código de estado HTTP esperado (200 OK)
