import { Skeleton } from "@/components/ui/skeleton";

type EpisodeSkeletonProps = {
  episodePerPage: number;
};

const EpisodeSkeleton = ({ episodePerPage }: EpisodeSkeletonProps) => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(episodePerPage)].map((_, index) => (
        <div key={index} className="flex gap-2">
          <Skeleton className="min-w-[180px] min-h-[110px] w-[180px] h-[110px] relative overflow-hidden rounded mr-5" />
          <div className="flex flex-col gap-2 items-start justify-center w-full">
						<Skeleton className="h-8 w-full rounded-sm" />
						<Skeleton className="h-8 w-52 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeSkeleton;
