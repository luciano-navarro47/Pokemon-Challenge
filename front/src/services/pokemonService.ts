import axios from "axios";
import { Pokemon } from "../interfaces/Pokemon.interface";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export type BattlePayload = {
  pokemon1Id: string;
  pokemon2Id: string;
}

export type BattleResponse = {
  winner: Pokemon;
}

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  try {
    const res = await axios.get<Pokemon[]>(`${REACT_APP_API_URL}/pokemon`);

    return res.data;
  } catch (error) {
    console.error("Error fetching pokemons: ", error);
    return [];
  }
};

export const startBattle = async (payload: BattlePayload): Promise<BattleResponse> => {
    const result = await axios.post<BattleResponse>(`${REACT_APP_API_URL}/battle`, payload);
    return result.data;
}