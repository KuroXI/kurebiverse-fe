import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { List } from "./components/List";

export const Discover = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <List />
    </QueryClientProvider>
  );
};
