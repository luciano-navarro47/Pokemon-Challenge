import { AppDataSource } from "./config/data-source";
import { seedPokemon} from "./seed/pokemon.seed";

AppDataSource.initialize()
    .then(async () => {
        await seedPokemon(AppDataSource);
        console.log('Seed executed successfully');
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error during seeding', error);
        process.exit(1);
    })

