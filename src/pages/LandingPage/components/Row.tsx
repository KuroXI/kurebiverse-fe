import axiosInstance from "@/api/axios";
import { IAnime, IResult } from "@/type/Anime";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "./Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRef } from "react";

type RowProps = {
  url: string;
  title: string;
};

export const Row = ({ url, title }: RowProps) => {
  const { data } = useQuery<IResult<IAnime>, string>({
    queryKey: [title],
    queryFn: () => axiosInstance(url).then(({ data }) => data),
  });

  const SliderRef = createRef<HTMLDivElement>();
  const scrollValue = window.innerWidth - 400;

  return (
    <div className="grid gap-3 md:mx-10 mx-0">
      <div className="flex items-center justify-between">
        <h1 className={"md:text-xl text-lg font-semibold capitalize"}>
          {title}
        </h1>
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
        {data?.results.map((anime) => <Modal anime={anime} key={anime.id} />)}
      </div>
    </div>
  );
};
