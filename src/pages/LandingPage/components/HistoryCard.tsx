import {History} from "@/type/History.ts";
import {useGetAnimeInfoQuery} from "@/redux/services/animeapi.ts";
import {parseTime, progressBar} from "@/lib/utils.ts";

type HistoryCardProps = {
  anime: History
}

export default function HistoryCard({ anime } : HistoryCardProps) {
  const { data } = useGetAnimeInfoQuery(anime.anime_id);

  return data && (
    <a href={`/watch/${anime.anime_id}?episodeId=${anime.episode_id}`}>
      <div
        className={"relative w-[28vw] h-[15vw] max-w-[450px] max-h-[250px] min-w-[220px] min-h-[150px] rounded-md"}
        style={{
          backgroundImage: `url(${data.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        <div className={"absolute h-full w-full pointer-events-none rounded-md bg-gradient-to-b from-transparent to-secondary"}/>
        <div className={"absolute flex flex-col gap-2 w-full px-2 bottom-4"}>
          <div className={"flex flex-col"}>
            <h1 className={"text-primary font-bold text-lg truncate"}>
              {data.title.english || data.title.userPreferred || data.title.romaji || data.title.native}
            </h1>
            <h1 className={"text-secondary-foreground text-sm"}>
              Episode {anime.episode_number}
            </h1>
          </div>
          <div className={"flex flex-col"}>
            <div className={"flex justify-between items-center"}>
              <h1 className={"text-secondary-foreground text-sm"}>
                {parseTime(anime.current_duration * 1000)}
              </h1>
              <h1 className={"text-secondary-foreground text-sm"}>
                {parseTime(anime.total_duration * 1000)}
              </h1>
            </div>
            <div className={"relative"}>
              <div className={"absolute bg-primary-foreground rounded-full w-full h-2"}/>
              <div
                className={`absolute bg-primary rounded-full h-2`}
                style={{ width: `${progressBar(anime.current_duration, anime.total_duration)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}