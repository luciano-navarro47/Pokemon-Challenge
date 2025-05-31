# Migraciones

Este proyecto utiliza TypeORM para manejar migraciones de base de datos.

### Generar una nueva migración

Para generar un nuevo archivo de migración con los cambios detectados en las entidades:

```
npm run migration:generate -- -d src/data-source.ts src/migrations/NombreDeLaMigracion
```
> Reemplazar NombreDeLaMigracion por un nombre descriptivo (ej. InitPokemon).

## Ejecutar migraciones
Para ejecutar todas las migraciones pendientes en la base de datos.
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

Esto volverá a crear la base de datos y aplicará las migraciones desde el inicio.
