import { History } from "@/type/History.ts";
import HistoryCard from "@/pages/LandingPage/components/HistoryCard.tsx";
import { createRef, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { supabase } from "@/redux/auth/supabase";
import { useSelector } from "react-redux";
import { SelectorState } from "@/type/Redux";

export const HistoryRow = () => {
  const sliderRef = createRef<HTMLDivElement>();
  const [hasScroll, setHasScroll] = useState(false);
  const [history, setHistory] = useState<History[] | null>(null);
  const { user } = useSelector((state: SelectorState) => state);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("histories")
      .select("*")
      .then(({ data }: { data: History[] | null }) => setHistory(data));
  }, [user]);

  useEffect(() => {
    if (sliderRef.current) {
      setHasScroll(
        sliderRef.current.scrollWidth > sliderRef.current.clientWidth
      );
    }
  }, [sliderRef]);

  return (
    history && (
      <div>
        <h1 className={"md:text-2xl text-xl md:ml-10 ml-0 py-5 font-bold"}>
          Continue Watching
        </h1>
        <div className={"flex items-center relative"}>
          <ChevronLeftIcon
            className={`${
              hasScroll ? "md:visible collapse" : "invisible"
            } md:mr-2 mr-0 w-8 h-full hover:bg-background/50 duration-300 transition-all`}
            onClick={() => (sliderRef.current!.scrollLeft -= 500)}
          />
          <div
            ref={sliderRef}
            className={
              "flex gap-2 slider whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth"
            }
          >
            {history.map((anime) => (
              <HistoryCard anime={anime} key={anime.anime_id} />
            ))}
          </div>
          <ChevronRightIcon
            className={`${
              hasScroll ? "md:visible collapse" : "invisible"
            } md:ml-2 ml-0 w-8 h-full hover:bg-background/50 duration-300 transition-all`}
            onClick={() => (sliderRef.current!.scrollLeft += 500)}
          />
        </div>
      </div>
    )
  );
}
