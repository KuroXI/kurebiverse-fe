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

const AnimeCard = ({title, image}: AnimeCardType) => {
  return (
    <img
      src={image}
      alt={title.english || title.romaji || title.native}
    />
  );
};

export default AnimeCard;
