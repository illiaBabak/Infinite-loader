import { useCallback, useEffect, useRef, useState } from 'react';
import { Pokemon } from 'src/components/Pokemon';
import { PokemonType } from 'src/types/pokemon';
import { isPokemonsData } from 'src/utils/guards';

const POKEMON_LIST_PAGE_SIZE = 20;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemon = useCallback(
    (el: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      }, options);

      if (el) observer.current.observe(el);
    },
    [observer]
  );

  useEffect(() => {
    const loadData = async () => {
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
    };
    loadData();
  }, [pageNumber]);

  return (
    <div className='list'>
      {pokemons.map((pokemon, index) => {
        if (index === pokemons.length - 1) {
          return (
            <div ref={lastPokemon} key={`pokemon-${pokemon.name}-${index}-ref`}>
              <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />;
            </div>
          );
        }
        return <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />;
      })}
    </div>
  );
};
