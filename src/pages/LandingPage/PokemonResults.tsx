const PokemonResults = ({
  results,
}: {
  results: PokemonResults | undefined;
}) => {
  return <div>{JSON.stringify(results)}</div>;
};

export default PokemonResults;
