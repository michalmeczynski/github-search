import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { AsyncDataLoadingStatus } from "../../common/async/async-data-loading-status.model";
import { useAsyncDataLoadingStatusFactory } from "../../common/async/async-data-loading-status-factory.hook";
import { useDebouncedEffect } from "../../common/debounce/debounce-effect.hook";
import { useGithubUserSearch } from "../../common/resources/github/user/search/github-user-search.hook";
import { useUserSearchForm } from "./user-search-form.hook";

export const useUserSearchComponent = (): UserSearchViewModel => {
  const userSearchForm = useUserSearchForm();

  const [userSearchQuery, setUserSearchQuery] = useState("");

  useDebouncedEffect(
    () => {
      if (userSearchForm.formState.isValid) {
        setUserSearchQuery(userSearchForm.watch("query"));
      }
    },
    [userSearchForm.watch("query"), userSearchForm.formState.isValid],
    2000
  );

  const githubUserSearch = useGithubUserSearch({
    query: userSearchQuery
  });

  return {
    form: {
      query: {
        errorMessage: userSearchForm.formState.errors.query?.message ?? "",
        isError: !!userSearchForm.formState.errors.query?.message,
        placeholder: "Wpisz nazwę użytkownika",
        register: userSearchForm.register("query")
      }
    },
    list: {
      canLoadMore: githubUserSearch.hasNextPage && !githubUserSearch.isFetchingNextPage,
      items: githubUserSearch.data.pages.map((page) => page.items).flat(),
      loadingStatus: useAsyncDataLoadingStatusFactory().createFromInfiniteQueryResult(githubUserSearch),
      onLoadMore: githubUserSearch.fetchNextPage
    }
  };
};

export type UserSearchViewModel = {
  form: {
    query: {
      errorMessage: string;
      isError: boolean;
      placeholder: string;
      register: UseFormRegisterReturn;
    };
  };
  list: UserSearchViewModel.List;
};

export namespace UserSearchViewModel {
  export type List = {
    canLoadMore: boolean;
    items: UserSearchViewModel.ListItem[];
    loadingStatus: AsyncDataLoadingStatus;
    onLoadMore: VoidFunction;
  };

  export type ListItem = {
    avatarUrl: string;
    login: string;
  };
}
