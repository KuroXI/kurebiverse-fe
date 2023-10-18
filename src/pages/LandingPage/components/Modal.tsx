import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cleanDescription, displayTitle, proxyImage } from "@/lib/utils";
import { Card } from "./Card";
import { IAnime } from "@/type/Anime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ModalProps = {
  anime: IAnime;
};

export const Modal = ({ anime }: ModalProps) => {
  return (
    anime && (
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <Card anime={anime} />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader className="h-full md:hidden block">
            <img
              src={proxyImage(anime.bannerImage)}
              className="rounded-md h-full bg-contain"
            />
          </DialogHeader>
          <div className="relative flex md:flex-row flex-col gap-5 items-start">
            <img
              src={proxyImage(anime.coverImage?.extraLarge)}
              className="rounded-md h-56 md:block hidden"
            />
            <div className="grid gap-1">
              <h1 className="md:text-4xl text-xl font-semibold text-foreground md:text-start text-center">
                {displayTitle(anime.title)}
              </h1>
              <div className="flex flex-wrap gap-2 md:justify-normal justify-center">
                {anime.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={"secondary"}
                    className={"font-light md:text-sm text-xs"}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <Separator className="my-2 md:block hidden" />
              <p className="text-muted-foreground line-clamp-5 md:text-base text-sm">
                {cleanDescription(anime.description as string)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};
