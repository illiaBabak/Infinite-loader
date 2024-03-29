import { useRef, useState } from 'react';
import { Alert } from 'src/components/Alert';
import { Loader } from 'src/components/Loader';
import { Pokemon } from 'src/components/Pokemon';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonType } from 'src/types/pokemon';

const LIMIT_PAGES = 65;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

export const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useGetPokemons({ pageNumber, setPokemons, setIsLoading, setIsError });

  const handleIntersect = (el: HTMLElement | null) => {
    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      if (pageNumber <= LIMIT_PAGES) setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }, options);

    if (el) observer.current.observe(el);
  };

  return (
    <div className='container'>
      <div className='list'>
        {pokemons.map((pokemon, index) => (
          <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />
        ))}
      </div>

      {isLoading ? <Loader /> : <div className='last-div' ref={handleIntersect} />}

      {isError && <Alert setIsError={setIsError} />}
    </div>
  );
};
