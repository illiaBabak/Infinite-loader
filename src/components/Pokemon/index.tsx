type Props = {
  name: string;
  imgId: number;
};

export const Pokemon = ({ name, imgId }: Props): JSX.Element => {
  return (
    <div className='pokemon'>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`} />
      <p>{name}</p>
    </div>
  );
};
