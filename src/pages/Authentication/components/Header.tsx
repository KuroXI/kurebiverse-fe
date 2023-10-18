import { CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { HeaderMessage } from "../constant";

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
    setData(HeaderMessage.get(type) as dataProps)
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
