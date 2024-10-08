import { UseInfiniteQueryResult } from "@tanstack/react-query";

import { AsyncDataLoadingStatus } from "./async-data-loading-status.model";

export const useAsyncDataLoadingStatusFactory = () => {
  const createFromInfiniteQueryResult = (queryResult: UseInfiniteQueryResult): AsyncDataLoadingStatus => {
    if (queryResult.fetchStatus === "fetching" && !queryResult.isFetchingNextPage) {
      return AsyncDataLoadingStatus.loading;
    }

    if (queryResult.isFetchingNextPage) {
      return AsyncDataLoadingStatus.loadingMore;
    }

    if (queryResult.status === "success" && queryResult.isFetched) {
      return AsyncDataLoadingStatus.success;
    }

    if (queryResult.status === "error") {
      return AsyncDataLoadingStatus.error;
    }

    return AsyncDataLoadingStatus.idle;
  };

  return {
    createFromInfiniteQueryResult
  };
};
