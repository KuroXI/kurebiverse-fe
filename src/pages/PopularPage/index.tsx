import {
  Box, CircularProgress,
  createTheme,
  ImageListItem,
  imageListItemClasses,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { IAnime } from "@kuroxi/kurebiverse-types";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import AnimeCardModal from "../LandingPage/components/AnimeCardModal";
import { useGetAnimeInfoQuery } from "../../redux/services/animeapi";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, QueryDefinition } from "@reduxjs/toolkit/dist/query";
import {proxyImage} from "../../lib/utils.ts";

const PopularPage = () => {
  const [results, setResults] = useState<IAnime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [id, setId] = useState("");

  const fetchPosts = useCallback( async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/popular?page=${currentPage}&perPage=100`);
    const data = await response.json();
    setCurrentPage(data.currentPage + 1);
    setResults((prev) => [...prev, ...data.results]);
    setHasNextPage(data.hasNextPage);
  }, [currentPage]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchPosts();
  }, [inView, fetchPosts, hasNextPage]);

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
          <ImageListItem key={`${index}-trending`} onClick={()=>{
            setId(String(anime.id));
            setConfirmationModal(true);
          }}>
            <img
              src={proxyImage(anime.coverImage?.extraLarge)}
              alt={anime.title.english}
              loading="lazy"
              className={"cursor-pointer rounded-md"}
            />
          </ImageListItem>
        ))}
      </Box>

      {hasNextPage && (
        <div className={"justify-center flex mb-10"} ref={ref}>
          <CircularProgress />
        </div>
      )}

      {confirmationModal && id.length > 0 && (
        <ConfirmationModal
          isOpen={confirmationModal}
          handleClose={() => {
            setId("");
            setConfirmationModal(false);
          }}>
          <AnimeCardModal query={useGetAnimeInfoQuery as (data: string) => UseQueryHookResult<QueryDefinition<string, BaseQueryFn, never, IAnime>>} id={id}/>
        </ConfirmationModal>
      )}
    </ThemeProvider>
  );
};

export { PopularPage };
