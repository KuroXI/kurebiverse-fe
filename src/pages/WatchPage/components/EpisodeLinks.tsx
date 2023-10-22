import { useState, FC, useMemo } from "react";
import { Box } from "@mui/material";
import { proxyImage } from "@/lib/utils";
import { Link } from "react-router-dom";
import { IEpisode } from "@/type/Anime";
import { PlayArrow } from "@mui/icons-material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import EpisodeSkeleton from "./Skeleton";

interface Props {
  data: IEpisode[] | undefined;
  animeId: string | undefined;
  currentPageNumber: number;
  dataIsLoading: boolean;
  episodeNumber: number;
}

export const EpisodeLinks: FC<Props> = ({
  data,
  animeId,
  currentPageNumber,
  dataIsLoading,
  episodeNumber,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(currentPageNumber);

  const episodesPerPage = 12;
  const totalPages = Math.ceil((data?.length || 0) / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const pageOptions = Array.from({ length: totalPages }, (_, index) =>
    String(index + 1)
  );

  const episodeLinks = useMemo(() => {
    if (!data) return null;

    const episodesForCurrentPage = data.slice(startIndex, endIndex);
    if (!episodesForCurrentPage) return null;

    return episodesForCurrentPage.map((episode, index) => {
      const currentPageEpNumber =
        currentPage !== 1
          ? index + 1 + episodesPerPage * (currentPage - 1)
          : index + 1;

      return (
        <Link
          key={`${episode.title}-${index}`}
          to={`/watch/${animeId}?episodeId=${episode.id}&page=${currentPage}&episodeNumber=${currentPageEpNumber}`}
        >
          <Box
            className="flex relative items-center mb-3 cursor-pointer w-full rounded-lg group"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "& .play-arrow": {
                  visibility: "visible",
                },
                "& img": {
                  opacity: 0.7,
                },
              },
            }}
          >
            <Box className="min-w-[180px] min-h-[110px] w-[180px] h-[110px] relative overflow-hidden rounded mr-5">
              <img
                src={proxyImage(episode.image)}
                alt={episode.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </Box>
            <p
              className={`${
                episodeNumber ===
                (currentPage === 1
                  ? index + 1
                  : index + 1 + episodesPerPage * (currentPage - 1))
                  ? "text-primary"
                  : "text-foreground"
              } text-md flex justify-center font-bold items-center group-hover:text-primary`}
            >
              <span className="text-xl mr-3">
                {currentPage === 1
                  ? index + 1
                  : index + 1 + episodesPerPage * (currentPage - 1)}
              </span>{" "}
              <span className="text-sm w-full">{episode.title}</span>
            </p>
            <PlayArrow
              className="play-arrow"
              sx={{
                color: "white",
                position: "absolute",
                left: 67,
                visibility: "hidden",
                fontSize: "50px",
              }}
            />
          </Box>
        </Link>
      );
    });
  }, [animeId, currentPage, data, endIndex, startIndex, episodeNumber]);

  return (
    <div>
      {totalPages > 1 && (
        <Select onValueChange={(value) => setCurrentPage(Number(value))}>
          <label>Select Episode Page</label>
          <SelectTrigger className="w-full mb-5">
            <SelectValue placeholder={`Page ${currentPage}`} />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="w-full h-96">
              <SelectGroup>
                {pageOptions.map((value) => (
                  <SelectItem key={value} value={value}>
                    {/* TODO: adding a episode range number per page */}
                    Page {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
        </Select>
      )}
      {dataIsLoading ? (
        <EpisodeSkeleton episodePerPage={episodesPerPage} />
      ) : (
        episodeLinks
      )}
    </div>
  );
};