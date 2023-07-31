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
    <Box className="mx-1 h-full">
      <img src={image} alt={title} className="object-cover w-full h-full" />
    </Box>
  );
};

export default AnimeCard;
