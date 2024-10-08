import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

import { UserSearch } from "./modules/user-search/user-search.component";

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSearch />
    </QueryClientProvider>
  );
};
