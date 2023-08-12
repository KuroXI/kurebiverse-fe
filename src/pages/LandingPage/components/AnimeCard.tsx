import {Box} from "@mui/material";

type AnimeCardType = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}

export default function AnimeCard({title, image}: AnimeCardType) {
  return (
      <Box className={"relative max-w-[200px] max-h-[300px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block mr-2"}>
        <img
          src={image}
          alt={title.english || title.romaji || title.native}
          sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
          className={"h-full w-full cursor-pointer rounded-lg"}
        />
      </Box>
  );
}