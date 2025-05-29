import { DataSource } from "typeorm";
import { Pokemon } from "../entities/pokemon.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "pokemon.db",
    entities: [Pokemon],
    migrations: ["src/migrations/*.ts"],
    synchronize: true,
});