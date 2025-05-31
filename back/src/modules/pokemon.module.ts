import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "../entities/pokemon.entity";
import { PokemonController } from "../controllers/pokemon.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    controllers: [PokemonController],
})

export class PokemonModule {}
