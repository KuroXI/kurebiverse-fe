import { SpinnerIcon } from "@/components/ui/icons";

type SpinnerProps = {
  ref: (node?: Element | null | undefined) => void;
	hasNextPage: boolean;
	isFetching: boolean;
};

export const Spinner = ({ ref, hasNextPage, isFetching }: SpinnerProps) => {
  return (
    
      {!hasNextPage && (
        <h1 className="text-muted-foreground text-sm">No more results</h1>
      )}
      {isFetching && (
        <SpinnerIcon className="mr-2 h-10 w-10 animate-spin text-primary" />
      )}
    </div>
  );
};
