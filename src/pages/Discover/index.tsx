import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { List } from "./components/List";

const Discover = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <List />
    </QueryClientProvider>
  );
};

export default Discover;