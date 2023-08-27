import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {createRef, useState} from "react";
import {QueryPagePerPage, useGetAnimeInfoQuery} from "../../../redux/services/animeapi.ts";
import {UseQueryHookResult} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {BaseQueryFn, QueryDefinition} from "@reduxjs/toolkit/query";
import {Box, CircularProgress} from "@mui/material";
import ConfirmationModal from "../../../components/modal/ConfirmationModal.tsx";
import AnimeCardModal from "./AnimeCardModal.tsx";
import AnimeCard from "./AnimeCard.tsx";
import {AnimeSort} from "../../../type/AnimeSort.ts";
import { IAnime } from "@kuroxi/kurebiverse-types";

type Props = {
  query: (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>;
  title: string
  redirect: string
}

export default function AnimeCardRow({ query, title, redirect } : Props) {
  const { data, isLoading } = query({ page: 1, perPage: 20 });
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [id, setId] = useState("");
  const sliderRef = createRef<HTMLDivElement>();

  return (
    <section className={"text-white pb-[2rem]"}>
      <div className={"flex flex-row justify-between items-center md:pl-[40px] md:pr-[40px] sm:pl-[20px] sm:pr-[20px] pb-2"}>
        <h2 className={"lg:text-[2rem] md:text-[1.5rem] sm:text-[1.2rem] font-[800]"}>{title}</h2>
        <a href={redirect} className={"hover:underline lg:text-[1.2rem] md:text-[1rem] sm:text-[0.8rem]"}>
          <h1>See more<span><ChevronRight/></span></h1>
        </a>
      </div>

      <div className={"relative flex items-center"}>
        {isLoading ? (
          <Box className="flex justify-center items-center w-full h-full">
            <CircularProgress color="success"/>
          </Box>
        ) : (
          <>
            <ChevronLeft
              className={"md:mr-[10px] sm:mr-[-10px] text-[3rem] md:visible invisible"}
              onClick={(() => sliderRef.current!.scrollLeft -= 500)}
            />
            <div ref={sliderRef} className={"slider whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth"}>
              {data?.results.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  {...anime}
                  onClick={() => {
                    setId(String(anime.id));
                    setConfirmationModal(true);
                  }}
                />
              ))}
            </div>
            <ChevronRight
              className={"md:ml-[10px] md:mr-[10px] sm:ml-[-10px] sm:mr-[0px] text-[3rem] md:visible invisible"}
              onClick={(() => sliderRef.current!.scrollLeft += 500)}
            />
          </>
        )}
      </div>
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
    </section>
  )
}