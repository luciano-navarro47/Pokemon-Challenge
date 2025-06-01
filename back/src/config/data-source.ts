import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "pokemon.db",
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
});

export default AppDataSource;