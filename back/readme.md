# Migraciones

Este proyecto utiliza TypeORM para manejar migraciones de base de datos.

### Generar una nueva migración

Para generar un nuevo archivo de migración con los cambios detectados en las entidades:

```
npm run migration:generate -- -d src/data-source.ts src/migrations/NombreDeLaMigracion
```

> Reemplazar NombreDeLaMigracion por un nombre descriptivo (ej. InitPokemon).

## Ejecutar migraciones

Para ejecutar las migraciones en la base de datos.

```
npm run migration:run
```

Esto aplicará los cambios al archivo pokemon.db.

## Borrar y reiniciar migraciones

Si necesitás reiniciar el esquema de base de datos desde cero, podés:

1. Eliminar manualmente el archivo pokemon.db.
2. Ejecutar nuevamente:

```
npm run migration:run
```

Esto vuelve a crear la base de datos aplicando las migraciones.

# Endpoints

## Obtener todos los Pokémons

Implementar un endpoint que devuelve al front un arreglo (lista) con todos los pokémones existentes en la base de datos.


Tipo de solicitud: GET 
```
http://localhost:3000/pokemon
```
### Ejemplo de respuesta
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

## Iniciar batalla 1vs1
Implementar un endpoint que simula una batalla entre dos Pokémons recibiendo sus IDs por body. El resultado de la batalla se calcula en base a sus stats y efectividad de tipo. Esta batalla concluirá cuando unos de los dos pokémons llegue primero a tener 0 puntos de HP. Al finalizar la batalla se guardará la información del ganador y perdedor en una tabla en la base de datos y le devuelve al front un objeto JSON con los datos del ganador.

Tipo de solicitud: POST
```
http://localhost:3000/battle
```

### Request body

```
{
  "pokemon1Id": "pokemon-4",
  "pokemon2Id": "pokemon-2"
}
```
+ pokemon1Id: ID del Pokémon seleccionado por el usuario.

+ pokemon2Id: ID aleatorio del segundo Pokémon.

### Ejemplo de respuesta
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