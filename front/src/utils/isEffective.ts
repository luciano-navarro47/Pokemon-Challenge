import { Pokemon } from "../interfaces/Pokemon.interface";

export const isEffective = (
  selected: Pokemon,
  opponent: Pokemon | null
): string => {
  const effectiveTypes = {
    electric: { strongAgainst: ["water"], weakAgainst: ["grass"] },
    fire: { strongAgainst: ["grass"], weakAgainst: ["water"] },
    water: { strongAgainst: ["fire"], weakAgainst: ["electric"] },
    grass: { strongAgainst: ["electric"], weakAgainst: ["fire"] },
    normal: { strongAgainst: [], weakAgainst: [] },
  };

  const type = selected.type.toLowerCase();

  if (
    effectiveTypes[type as keyof typeof effectiveTypes].strongAgainst[0] ===
    opponent?.type.toLowerCase()
  ) {
    return "critical";
  } else if (
    effectiveTypes[type as keyof typeof effectiveTypes].weakAgainst[0] ===
    opponent?.type.toLowerCase()
  ) {
    return "weak";
  } else {
    return "normal";
  }
};
