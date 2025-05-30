import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "src/entities/pokemon.entity";
import { BattleController } from "src/controllers/battle.controller";
import { BattleResult } from "src/entities/battle-result.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
    controllers: [BattleController]
})

export class BattleModule {}