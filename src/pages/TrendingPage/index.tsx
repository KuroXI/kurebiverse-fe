import {Box, ImageList, ImageListItem} from "@mui/material";
import {useEffect, useLayoutEffect, useState} from "react";
import {useInView} from 'react-intersection-observer';

const TrendingPage = () => {
  const [results, setResults] = useState<AnimeResultsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchPosts = () => {
    fetch(`https://kurebiverse-be.vercel.app/trending?page=${currentPage}&perPage=100`)
      .then((response) => response.json())
      .then((data: AnimeQueryType) => {
        setCurrentPage(data.currentPage + 1);
        setResults((prev) => [...prev, ...data.results]);
        setHasNextPage(data.hasNextPage);
      })
  }

  const {ref, inView} = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchPosts();
  }, [inView]);
  useLayoutEffect(() => fetchPosts, []);

  return (
    <Box className={"mt-20"}>
      <h3 className="text-white font-bold xl:text-3xl lg:text-2xl mb-5 ml-5">Trending Anime</h3>

      <ImageList
        gap={8}
        rowHeight="auto"
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 2fr)) !important',
          gridTemplateRows: 'repeat(auto-fill, minmax(150px, 2fr)) !important'
        }}
        className={"m-5"}
      >
        {results.map((anime, index) => (
          <ImageListItem key={`${index}-trending`}>
            <img
              src={`${anime.image}?w=300&h=400&fit=crop&auto=format&dpr=2`}
              alt={anime.title}
              loading="lazy"
              className={"cursor-pointer rounded-md"}
            />
          </ImageListItem>
        ))}
        <div ref={ref}></div>
      </ImageList>
    </Box>
  );
};

export {TrendingPage};