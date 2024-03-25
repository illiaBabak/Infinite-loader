import { useRef, useState } from 'react';
import { Pokemon } from 'src/components/Pokemon';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonType } from 'src/types/pokemon';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useGetPokemons({ pageNumber, setPokemons });

  const handleIntersect = (el: HTMLElement | null) => {
    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }, options);

    if (el) observer.current.observe(el);
  };

  return (
    <div className='list'>
      {pokemons.map((pokemon, index) => (
        <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />
      ))}
      <div ref={handleIntersect} />
    </div>
  );
};
