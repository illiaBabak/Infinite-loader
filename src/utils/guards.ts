import { PokemonType } from 'src/types/pokemon';

type DataType = {
  results: PokemonType[];
};

const isPokemon = (data: unknown): data is PokemonType => {
  return (
    !!data &&
    typeof data === 'object' &&
    'name' in data &&
    'url' in data &&
    typeof data.name === 'string' &&
    typeof data.url === 'string'
  );
};

const isPokemonArr = (data: unknown): data is PokemonType[] => {
  return Array.isArray(data) && data.every((el) => isPokemon(el));
};

export const isPokemonsData = (data: unknown): data is DataType => {
  return !!data && typeof data === 'object' && 'results' in data && isPokemonArr(data.results);
};
