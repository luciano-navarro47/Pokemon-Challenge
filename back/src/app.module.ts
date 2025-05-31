import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './modules/pokemon.module';
import { BattleModule } from './modules/battle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pokemon.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PokemonModule,
    BattleModule
  ],
  providers: [AppService],
})
export class AppModule {}
