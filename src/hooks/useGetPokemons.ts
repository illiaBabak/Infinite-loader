import { useEffect } from 'react';
import { PokemonType } from 'src/types/pokemon';
import { isPokemonsData } from 'src/utils/guards';

const POKEMON_LIST_PAGE_SIZE = 20;

type Props = {
  pageNumber: number;
  setPokemons: React.Dispatch<React.SetStateAction<PokemonType[]>>;
};

export const useGetPokemons = ({ pageNumber, setPokemons }: Props): void => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber * POKEMON_LIST_PAGE_SIZE}&limit=${POKEMON_LIST_PAGE_SIZE}`
        );

        const pokemonsData: unknown = await response.json();
        if (isPokemonsData(pokemonsData)) {
          const { results } = pokemonsData;

          setPokemons((prevPokemons) => [...prevPokemons, ...results]);
        } else {
          throw new Error('Something went wrong');
        }
      } catch {
        //
      }
    };
    loadData();
  }, [pageNumber, setPokemons]);
};
