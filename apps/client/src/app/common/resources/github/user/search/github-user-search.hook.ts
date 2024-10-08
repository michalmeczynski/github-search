import { DefaultError, InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";

import { useGithubUserApi } from "../api/github-user-api.hook";

export const useGithubUserSearch = (payload: GithubUserSearchPayload) => {
  const api = useGithubUserApi();

  return useInfiniteQuery<GithubUserSearchResult, DefaultError, InfiniteData<GithubUserSearchResult>, QueryKey, number>(
    {
      enabled: !!payload.query,
      getNextPageParam: (lastPage, allPages) => (lastPage.items.length ? allPages.length + 1 : undefined),
      initialData: {
        pageParams: [],
        pages: []
      },
      initialPageParam: 1,
      queryFn: async ({ pageParam, signal }) => {
        const response = await api.search({
          abortSignal: signal,
          request: {
            page: pageParam,
            per_page: 8,
            q: payload.query
          }
        });

        return {
          items: response.data.items.map((item) => ({
            avatarUrl: item.avatar_url,
            login: item.login
          })),
          totalCount: response.data.total_count
        };
      },
      queryKey: ["github-user-search", payload.query],
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );
};

export type GithubUserSearchPayload = {
  query: string;
};

export type GithubUserSearchResult = {
  items: GithubUserSearchResult.Item[];
  totalCount: number;
};

export namespace GithubUserSearchResult {
  export type Item = {
    avatarUrl: string;
    login: string;
  };
}
