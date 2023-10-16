import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, QueryDefinition } from "@reduxjs/toolkit/query";
import { Add, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IAnime, ITitle } from "@/type/Anime";
import { cleanDescription, displayTitle } from "@/lib/utils";

type AnimeCardModalProps = {
  query: (
    data: string
  ) => UseQueryHookResult<QueryDefinition<string, BaseQueryFn, never, IAnime>>;
  id: string;
};

export default function AnimeCardModal({ id, query }: AnimeCardModalProps) {
  const { data, isLoading } = query(id);

  return isLoading ? (
    <></>
  ) : (
    <>
      <div className={"relative"}>
        <img
          src={data?.coverImage?.extraLarge}
          alt={data?.id}
          className="w-full min-h-[300px] max-h-[400px] object-cover"
        />
        <div className="absolute inset-0 h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-[#141414]" />
        <div className={"absolute left-10 top-[30%]"}>
          <p
            className={
              "text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8"
            }
          >
            {displayTitle(data?.title || ({} as ITitle))}
          </p>
          <div className={"flex flex-row gap-4 items-center"}>
            <Link to={`/watch/${data?.id}?episodeNumber=1`}>
              <button
                className={
                  "text-black rounded-full bg-green-600 hover:bg-green-400 px-5 font-bold"
                }
              >
                <PlayArrow fontSize={"large"} />
              </button>
            </Link>
            <button
              className={
                "text-black rounded-full bg-neutral-600 hover:bg-neutral-400 px-5 font-bold"
              }
            >
              <Add fontSize={"large"} />
            </button>
          </div>
        </div>
      </div>
      <div className={"grid md:grid-cols-3 grid-cols-2 px-12 py-8 gap-x-4"}>
        <div className={"md:col-span-2"}>
          <div className={"flex gap-4 pb-5 lg:text-lg md:text-md text-sm"}>
            <p className={"text-green-400 pr-5 text-center font-bold"}>
              {data?.status}
            </p>
            <p className={"text-white pr-5 text-center font-bold"}>
              {data?.startDate.year}
            </p>
          </div>
          <p
            className={
              "text-white line-clamp-[7] lg:text-md md:text-sm text-sx"
            }
          >
            {cleanDescription(data?.description || "")}
          </p>
        </div>
        <div className={"lg:text-md md:text-sm text-sx"}>
          <p className={"text-neutral-600"}>
            Rating:{" "}
            <span className={"text-white"}>
              {(data?.averageScore as number) / 10}
            </span>
          </p>
          <p className={"text-neutral-600"}>
            Genres:{" "}
            <span className={"text-white"}>
              {data?.genres?.map((genre) => genre).join(", ")}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
