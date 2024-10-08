import { AsyncDataLoadingStatus } from "../../async/async-data-loading-status.model";

type Props = {
  canLoadMore: boolean;
  items: unknown[];
  loadMore: VoidFunction;
  loadingStatus: AsyncDataLoadingStatus;
};

export const useInfiniteListComponent = ({
  canLoadMore,
  items,
  loadMore,
  loadingStatus
}: Props): InfiniteListViewModel => {
  return {
    error: {
      isVisible: loadingStatus === AsyncDataLoadingStatus.error,
      label: "Wystąpił błąd podczas ładowania danych"
    },
    isContentVisible: [AsyncDataLoadingStatus.success, AsyncDataLoadingStatus.loadingMore].includes(loadingStatus),
    isLoaderVisible: loadingStatus === AsyncDataLoadingStatus.loading,
    loadMoreButton: {
      isVisible: loadingStatus === AsyncDataLoadingStatus.success && canLoadMore,
      label: "Więcej",
      onClick: loadMore
    },
    loadingMore: {
      isVisible: loadingStatus === AsyncDataLoadingStatus.loadingMore,
      label: "Trwa ładowanie"
    },
    noData: {
      isVisible: loadingStatus === AsyncDataLoadingStatus.success && items.length === 0,
      label: "Brak danych"
    },
    noMoreData: {
      isVisible: !canLoadMore && loadingStatus === AsyncDataLoadingStatus.success && !!items.length,
      label: "To wszystko"
    }
  };
};

export type InfiniteListViewModel = {
  error: {
    isVisible: boolean;
    label: string;
  };
  isContentVisible: boolean;
  isLoaderVisible: boolean;
  loadMoreButton: {
    isVisible: boolean;
    label: string;
    onClick: VoidFunction;
  };
  loadingMore: {
    isVisible: boolean;
    label: string;
  };
  noData: {
    isVisible: boolean;
    label: string;
  };
  noMoreData: {
    isVisible: boolean;
    label: string;
  };
};
