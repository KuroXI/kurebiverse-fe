import { ICoverImage, ITitle } from "@kuroxi/kurebiverse-types";
import {Box} from "@mui/material";
import {proxyImage} from "@/lib/utils.ts";

type AnimeCardType = {
  onClick: () => void;
  title: ITitle;
  coverImage: ICoverImage | null
}

export default function AnimeCard({title, coverImage, onClick}: AnimeCardType) {

  return (
      <Box
        onClick={onClick}
        className={"relative max-w-[200px] max-h-[300px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block mr-2"}
      >
        <img
          src={proxyImage(coverImage?.extraLarge)}
          alt={title.english || title.romaji || title.native}
          sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
          className={"h-full w-full cursor-pointer rounded-lg"}
        />
      </Box>
  );
}