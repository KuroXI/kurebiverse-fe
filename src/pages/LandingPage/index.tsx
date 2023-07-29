import { Suspense, useEffect, useState, lazy } from "react";
import axios from "../../api/axios";
import { Box, CircularProgress } from "@mui/material";
import { SEO } from "../../components";
const PokemonResults = lazy(() => import("./PokemonResults"));

const LandingPage = () => {
  const [pokemonResults, setPokemonResults] = useState<
    PokemonResults | undefined
  >(undefined);

  useEffect(() => {
    const fetchPokemonSample = async () => {
      const response = await axios.get("/pokemon?limit=100000&offset=0");
      const { results } = (await response.data) as PokemonAPI;

      setPokemonResults(results);
    };

    fetchPokemonSample();
  }, []);

  return (
    <Box>
      <SEO
        description="Landing Page"
        name="Landing Page"
        title="Kurebiverse | Landing Page"
        type="type"
        key={"1"}
      />
      <p>LandingPage</p>
      <Suspense fallback={<CircularProgress />}>
        <PokemonResults results={pokemonResults} />
      </Suspense>
    </Box>
  );
};

export { LandingPage };
