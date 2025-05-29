import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('integer')
  attack!: number;

  @Column('integer')
  defense!: number;

  @Column('integer')
  hp!: number;

  @Column('integer')
  speed!: number;

  @Column('varchar')
  type!: string;

  @Column('varchar')
  imageUrl!: string;
}
