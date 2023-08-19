import {
  Box, CircularProgress,
  createTheme,
  ImageListItem,
  imageListItemClasses,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {AnimeSort, AnimeSortResult} from "../../type/AnimeSort.ts";

const PopularPage = () => {
  const [results, setResults] = useState<AnimeSortResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchPosts = useCallback(() => {
    fetch(`https://kurebiverse-be.vercel.app/popular?page=${currentPage}&perPage=100`)
      .then((response) => response.json())
      .then((data: AnimeSort) => {
        setCurrentPage(data.currentPage + 1);
        setResults((prev) => [...prev, ...data.results]);
        setHasNextPage(data.hasNextPage);
      });
  }, [currentPage]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchPosts();
  }, [inView, fetchPosts, hasNextPage]);

  useLayoutEffect(() => fetchPosts, [fetchPosts]);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <h3 className={"text-white font-bold xl:text-3xl lg:text-2xl mb-5 ml-5 mt-20"}>
        Popular Anime
      </h3>
      <Box
        className={"m-5"}
        gap={1.5}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(7, 1fr)",
            xl: "repeat(8, 1fr)",
          },
          [`& .${imageListItemClasses.root}`]: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {results.map((anime, index) => (
          <ImageListItem key={`${index}-trending`}>
            <img
              src={`${anime.image}?w=300&h=400&fit=crop&auto=format&dpr=2`}
              alt={anime.title.english}
              loading="lazy"
              className={"cursor-pointer rounded-md"}
            />
          </ImageListItem>
        ))}
      </Box>

      <div className={"justify-center flex mb-10"} ref={ref}>
        <CircularProgress/>
      </div>
    </ThemeProvider>
  );
};

export { PopularPage };
