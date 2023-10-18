import { Button } from "@/components/ui/button";
import { SpinnerIcon } from "@/components/ui/icons";

type AuthButtonProps = {
  isSubmitting: boolean;
  name: string;
};

export const AuthButton = ({ isSubmitting, name }: AuthButtonProps) => {
  return (
    <Button className="w-full mt-6" type="submit" disabled={isSubmitting}>
      {isSubmitting && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
      {name}
    </Button>
  );
};
