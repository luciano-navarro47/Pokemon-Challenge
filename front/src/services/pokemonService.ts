import axios from "axios";
import { Pokemon } from "../interfaces/Pokemon.interface";

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  try {
    const res = await axios.get<Pokemon[]>("http://localhost:3000/pokemon");

    return res.data;
  } catch (error) {
    console.error("Error fetching pokemons: ", error);
    return [];
  }
};
