import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('varchar')
  winner_name!: string;

  @Column('varchar')
  loser_name!: string;

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'winner_id' })
  winner!: Pokemon;

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'loser_id' })
  loser!: Pokemon;

  @Column('int')
  turns!: number;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
