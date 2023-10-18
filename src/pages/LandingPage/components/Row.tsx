import axiosInstance from "@/api/axios";
import { IAnime, IResult } from "@/type/Anime";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "./Modal";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRef } from "react";

type RowProps = {
  url: string;
  title: string;
};

export const Row = ({ url, title }: RowProps) => {
  const { data, isLoading } = useQuery<IResult<IAnime>, string>({
    queryKey: [title],
    queryFn: () => axiosInstance(url).then(({ data }) => data),
  });

  const SliderRef = createRef<HTMLDivElement>();
  const scrollValue = window.innerWidth - 400;

  return (
    <div className="grid gap-3 md:mx-10 mx-0">
      <div className="flex items-center justify-between">
        <h1 className={"md:text-xl text-lg font-semibold capitalize"}>{title}</h1>
        <div className="md:flex gap-5 hidden">
          <Button
            onClick={() => (SliderRef.current!.scrollLeft -= scrollValue)}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => (SliderRef.current!.scrollLeft += scrollValue)}
            variant="ghost"
            size="icon"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div
        ref={SliderRef}
        className={
          "flex gap-2 slider whitespace-nowrap overflow-x-scroll scroll-smooth"
        }
      >
        {isLoading
          ? [...Array(20)].map((_, index) => (
              <Skeleton
                key={index}
                className="max-w-[300px] max-h-[350px] min-w-[200px] min-h-[250px] w-16 h-52"
              />
            ))
          : data?.results.map((anime) => (
              <Modal anime={anime} key={anime.id} />
            ))}
      </div>
    </div>
  );
};
