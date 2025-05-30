import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "src/entities/pokemon.entity";
import { BattleController } from "src/controllers/battle.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    controllers: [BattleController]
})

export class BattleModule {}