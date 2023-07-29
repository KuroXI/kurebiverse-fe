import { Box } from "@mui/material";

const AnimeCard = ({
  id,
  title,
  image,
  type,
  rating,
  releaseDate,
}: {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}) => {
  return (
    <Box className="relative w-[215px]">
      <img src={image} alt={title} />
    </Box>
  );
};

export default AnimeCard;
