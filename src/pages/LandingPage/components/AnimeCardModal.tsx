import { Box } from "@mui/material";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, QueryDefinition } from "@reduxjs/toolkit/query";
import { Add, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IAnime } from "@kuroxi/kurebiverse-types";

type AnimeCardModalProps = {
  query: (data: string) => UseQueryHookResult<QueryDefinition<string, BaseQueryFn, never, IAnime>>
  id: string
};

export default function AnimeCardModal({ id, query }: AnimeCardModalProps) {
  const { data, isLoading } = query(id);

  return isLoading ? (<></>) : (
    <>
      <Box className={"relative"}>
        <img
          src={data?.coverImage?.extraLarge}
          alt={data?.id}
          className="w-full min-h-[300px] max-h-[400px] object-cover"
        />
        <Box className="absolute inset-0 h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-[#141414]" />
        <Box className={"absolute left-10 top-[30%]"}>
          <p className={"text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8"}>
            {data?.title.english || data?.title.userPreferred || data?.title.romaji || data?.title.native}
          </p>
          <Box className={"flex flex-row gap-4 items-center"}>
            <Link to={`/watch/${data?.id}`}>
              <button className={"text-black rounded-full bg-green-600 hover:bg-green-400 px-5 font-bold"}>
                <PlayArrow fontSize={"large"} />
              </button>
            </Link>
            <button className={"text-black rounded-full bg-neutral-600 hover:bg-neutral-400 px-5 font-bold"}>
              <Add fontSize={"large"} />
            </button>
          </Box>
        </Box>
      </Box>
      <Box className={"grid md:grid-cols-3 grid-cols-2 px-12 py-8 gap-x-4"}>
        <Box className={"md:col-span-2"}>
          <Box className={"flex gap-4 pb-5 lg:text-lg md:text-md text-sm"}>
            <p className={"text-green-400 pr-5 text-center font-bold"}>{data?.status}</p>
            <p className={"text-white pr-5 text-center font-bold"}>{data?.startDate.year}</p>
          </Box>
          <p className={"text-white line-clamp-[7] lg:text-md md:text-sm text-sx"}>
            {data?.description?.replace(/\(Source:[\s\S]*$/g, "").replace(/<[^>]*>/g, "")}
          </p>
        </Box>
        <Box className={"lg:text-md md:text-sm text-sx"}>
          <p className={"text-neutral-600"}>
            Rating: <span className={"text-white"}>{data?.averageScore as number / 10}</span>
          </p>
          <p className={"text-neutral-600"}>
            Genres:{" "}
            <span className={"text-white"}>
              {data?.genres?.map((genre) => genre).join(", ")}
            </span>
          </p>
        </Box>
      </Box>
    </>
  );
}
