import axios from "axios";
import { Pokemon } from "../interfaces/Pokemon.interface";

const HOST = "http://localhost:3000"

export type BattlePayload = {
  pokemon1Id: string;
  pokemon2Id: string;
}

export type BattleResponse = {
  winner: Pokemon;
}

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  try {
    const res = await axios.get<Pokemon[]>(`${HOST}/pokemon`);

    return res.data;
  } catch (error) {
    console.error("Error fetching pokemons: ", error);
    return [];
  }
};

export const startBattle = async (payload: BattlePayload): Promise<BattleResponse> => {
    const result = await axios.post<BattleResponse>(`${HOST}/battle`, payload);
    return result.data;
}