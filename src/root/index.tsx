import { useEffect, useState } from 'react';
import { Pokemon } from 'src/components/Pokemon';
import { PokemonType } from 'src/types/pokemon';
import { isPokemonsData } from 'src/utils/guards';

const POKEMON_LIST_PAGE_SIZE = 20;

export const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}&limit=${POKEMON_LIST_PAGE_SIZE}`
      );

      const pokemonsData: unknown = await response.json();
      if (isPokemonsData(pokemonsData)) {
        const { results } = pokemonsData;
        setPokemons((prevPokemons) => [...prevPokemons, ...results]);
      } else {
        throw new Error('Something went wrong');
      }
    };
    loadData();
  }, [pokemons.length]);

  return (
    <div className='list'>
      {pokemons.map((pokemon, index) => (
        <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />
      ))}
    </div>
  );
};
