import { Box } from "@mui/material";

const AnimeCard = ({
  title,
  image,
}: {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}) => {
  return (
    <Box className="mx-1 h-[15vw] hover:scale-125 hover:bg-black hover:bg-opacity-80">
      <img src={image} alt={title} className="object-cover w-full h-[15vw]"/>
    </Box>
  );
};

export default AnimeCard;
