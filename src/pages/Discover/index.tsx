import axiosInstance from "@/api/axios";
import { IAnime, IResult } from "@/type/Anime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Filter } from "./components/Filter";
import { Filters } from "./constant";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListCard } from "./components/ListCard";
import { displayTitle, proxyImage } from "@/lib/utils";

const Discover = () => {
  const [selectedAnime, setSelectedAnime] = useState<IAnime | null>(null);
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IResult<IAnime>
  >({
    queryKey: [`list-${filter}`],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance(
        `/${filter}?page=${pageParam}&perPage=50`,
      );

      if (!selectedAnime) setSelectedAnime(data.results[0]);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) return lastPage.currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const fetchInfo = useCallback(
    async (animeId: string) => {
      if (data) {
        const { data: animeInfo }: { data: IAnime } = await axiosInstance(
          `/info/${animeId}`,
        );
        setSelectedAnime(animeInfo);
      }
    },
    [data],
  );

  return (
    data && (
      <div className="grid grid-cols-4 px-5 gap-5">
        <div className="md:col-span-3 col-span-4 rounded-lg px-2">
          <div className="flex gap-2 capitaliz">
            <Filter
              name="Category"
              defaultValue={filter || undefined}
              filters={Filters.get("category") ?? []}
            />
          </div>
          <Separator className="my-2" />
          <ScrollArea className="h-[80vh]">
            <div className="flex flex-wrap justify-between gap-3 w-full content-between pr-4">
              {data.pages.map((page) =>
                page.results.map((anime) => (
                  <ListCard
                    key={anime.id}
                    anime={anime}
                    fetchInfo={fetchInfo}
                  />
                )),
              )}
            </div>
            <div ref={ref} />
          </ScrollArea>
        </div>
        {selectedAnime && (
          <div
            className="relative col-span-1 rounded-lg bg-fill bg-no-repeat md:block hidden"
            style={{
              backgroundImage: `url(${proxyImage(
                selectedAnime.coverImage?.extraLarge,
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="absolute w-full h-full backdrop-blur-sm rounded-lg" />
            <div className="absolute w-full h-full bg-background opacity-40" />
            <div className="absolute p-5">
              <h1>{displayTitle(selectedAnime.title)}</h1>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Discover;
