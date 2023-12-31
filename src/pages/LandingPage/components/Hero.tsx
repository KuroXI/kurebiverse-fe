import axios from "axios";
import { cleanDescription, displayTitle, proxyImage, randomInt } from "@/lib/utils.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Bookmark, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ITitle } from "@/type/Anime";
import { useQuery } from "@tanstack/react-query";
import { LandingRandomQuery } from "@/lib/query";
import { AnimeRandom } from "@/type/Landing/type";
import { SpinnerIcon } from "@/components/ui/icons";

export const Hero = () => {
  const { data, isLoading } = useQuery<AnimeRandom>({
    queryKey: ["heroRandom"],
    queryFn: () =>
      axios
        .post("https://consumet-graphql.vercel.app/graphql", {
          query: LandingRandomQuery,
          variables: {
            perPage: 50,
          },
        })
        .then(({ data }) => {
          const length = data.data.anilist.getTrending.results.length;
          return data.data.anilist.getTrending.results[randomInt(length)];
        }),
  });

  return isLoading ? (
    <header
      className={
        "relative xl:h-[80vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh]"
      }
    >
      <div className="flex justify-center items-center w-full h-full">
        <SpinnerIcon className="h-10 w-10 animate-spin" />
      </div>
    </header>
  ) : (
    <header
      className={"relative h-[100vw] min-h-[400px] max-h-[700px]"}
      style={{
        backgroundImage: `url(${proxyImage(data?.cover)})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div
        className={
          "absolute h-1/6 w-full pointer-events-none bg-gradient-to-t from-transparent to-background"
        }
      />
      <div
        className={
          "absolute h-full w-2/3 pointer-events-none bg-gradient-to-l from-transparent to-background"
        }
      />

      <div
        className={
          "flex flex-col gap-5 absolute lg:mx-20 md:mx-10 mx-5 md:top-[30%] top-[25%] md:max-w-4xl max-w-screen"
        }
      >
        <h1
          className={"text-primary font-bold md:text-4xl text-3xl line-clamp-2"}
        >
          {displayTitle(data?.title || ({} as ITitle))}
        </h1>
        <div className={"flex flex-wrap overflow-hidden gap-x-2 gap-y-1"}>
          {data?.genres.map((genre) => (
            <Badge
              key={genre.toLowerCase()}
              variant={"secondary"}
              className={"font-light text-sm"}
            >
              {genre}
            </Badge>
          ))}
        </div>
        {data?.description && (
          <h1
            className={
              "md:text-base text-sm md:font-normal font-light md:line-clamp-5 line-clamp-4"
            }
          >
            {cleanDescription(data?.description)}
          </h1>
        )}
        <div className={"flex md:gap-5 gap-2"}>
          <Link to={`/watch/${data?.id}?episodeNumber=1`}>
            <Button
              className={
                "flex gap-1 text-sm font-medium text-primary-foreground"
              }
            >
              <PlayCircle />
              Play Now
            </Button>
          </Link>
          <Button
            variant={"secondary"}
            className={"flex gap-1 text-sm font-medium"}
          >
            <Bookmark />
            Add Watchlist
          </Button>
        </div>
      </div>

      <div
        className={
          "h-full w-full pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background"
        }
      />
    </header>
  );
};
