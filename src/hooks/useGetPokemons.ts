import { useEffect } from 'react';
import { PokemonType } from 'src/types/pokemon';
import { isPokemonsData } from 'src/utils/guards';

const POKEMON_LIST_PAGE_SIZE = 20;

type Props = {
  pageNumber: number;
  setPokemons: React.Dispatch<React.SetStateAction<PokemonType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useGetPokemons = ({ pageNumber, setPokemons, setIsLoading, setIsError }: Props): void => {
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber * POKEMON_LIST_PAGE_SIZE}&limit=${POKEMON_LIST_PAGE_SIZE}`
        );

        const pokemonsData: unknown = await response.json();

        if (isPokemonsData(pokemonsData)) {
          const { results } = pokemonsData;

          if (!results.length) throw new Error('Something went wrong with request');

          setPokemons((prevPokemons) => [...prevPokemons, ...results]);
        } else {
          throw new Error('Something went wrong with API');
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [pageNumber, setPokemons, setIsLoading, setIsError]);
};
