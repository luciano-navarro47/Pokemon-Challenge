import { Body, Controller, Post } from '@nestjs/common';
import { Pokemon } from '../entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BattleResult } from 'src/entities/battle-result.entity';

interface BattleRequest {
  pokemon1Id: string;
  pokemon2Id: string;
}

// Extra - Type System
const typeEffectiveness: Record<
  string,
  { strongAgainst: string[]; weakAgainst: string[] }
> = {
  electric: { strongAgainst: ['water'], weakAgainst: ['grass'] },
  fire: { strongAgainst: ['grass'], weakAgainst: ['water'] },
  water: { strongAgainst: ['fire'], weakAgainst: ['electric'] },
  grass: { strongAgainst: ['electric'], weakAgainst: ['fire'] },
  normal: { strongAgainst: [], weakAgainst: [] },
};

function calculateTypeMultiplier(
  attackerType: string,
  defenderType: string,
): number {
  attackerType = attackerType.toLowerCase();
  defenderType = defenderType.toLowerCase();

  const effectiveness = typeEffectiveness[attackerType];

  if (!effectiveness) return 1;

  if (effectiveness.strongAgainst.includes(defenderType)) return 2;
  if (effectiveness.weakAgainst.includes(defenderType)) return 0.5;

  return 1;
}

@Controller('battle')
export class BattleController {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BattleResult)
    private readonly battleResultRepository: Repository<BattleResult>,
  ) {}
  @Post()
  async battle(@Body() body: BattleRequest) {
    const { pokemon1Id, pokemon2Id } = body;

    const [pokemon1, pokemon2] = await Promise.all([
      this.pokemonRepository.findOne({ where: { id: pokemon1Id } }),
      this.pokemonRepository.findOne({ where: { id: pokemon2Id } }),
    ]);

    if (!pokemon1 || !pokemon2) {
      return { message: 'One or both pokemons not found.' };
    }

    // Calculate the battle
    let attacker = {...pokemon1};
    let defender = {...pokemon2};

    if (
      pokemon2.speed > pokemon1.speed ||
      (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)
    ) {
      attacker = pokemon2;
      defender = pokemon1;
    }

    let turns = 0;

    while (attacker.hp > 0 && defender.hp > 0) {
      let baseDamage = attacker.attack - defender.defense;

      if (baseDamage <= 0) baseDamage = 1;

      const multiplier = calculateTypeMultiplier(attacker.type, defender.type);
      const totalDamage = baseDamage * multiplier;

      defender.hp -= totalDamage;

      turns++;
      
      if (defender.hp <= 0) break;
      
      // Swap roles for each turn
      [attacker, defender] = [defender, attacker];
    }

    const battleResult = this.battleResultRepository.create({
      winner_name: attacker.name,
      loser_name: defender.name,
      winner: attacker,
      loser: defender,
      turns,
    }); 

    await this.battleResultRepository.save(battleResult);

    return {
      winner: attacker,
    };
  }
}
