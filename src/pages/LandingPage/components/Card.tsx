import { proxyImage } from "@/lib/utils";
import { IAnime } from "@/type/Anime";

type CardProps = {
  anime: IAnime;
};

export const Card = ({ anime }: CardProps) => {
  return (
    <div
      className={
        "relative max-w-[200px] max-h-[250px] min-w-[100px] min-h-[150px] w-[35vw] h-[42vw] inline-block mr-2"
      }
    >
      <img
        src={proxyImage(anime.coverImage?.extraLarge)}
        alt={anime.id}
        sizes={
          "(min-width: 1080px) 300px, (min-width: 800px) calc(15.38vw + 37px), 200px"
        }
        className={"w-full h-full rounded-lg"}
      />
    </div>
  );
};
