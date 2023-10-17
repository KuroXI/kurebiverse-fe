import { CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type HeaderProps = {
  type: string;
};

type dataProps = {
  title: string;
  description: string;
  link: string;
};

export const Header = ({ type }: HeaderProps) => {
  const [data, setData] = useState<dataProps>({} as dataProps);

  useEffect(() => {
    if (type === "login") {
      setData({
        title: "Sign In",
        description: "Don't have an account?",
        link: "Sign Up",
      });
    }
  }, [type]);

  return (
    data && (
      <>
        <CardTitle className="text-xl">{data.title}</CardTitle>
        <CardDescription className="flex flex-row space-x-2">
          <p className="text-sm text-muted-foreground">{data.description}</p>
          <a href="/register" className="text-primary text-sm">
            {data.link}
          </a>
        </CardDescription>
      </>
    )
  );
};
