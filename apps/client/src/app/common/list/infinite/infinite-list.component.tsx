import { styled } from "@mui/material";
import { Fragment } from "react";

import { AsyncDataLoadingStatus } from "../../async/async-data-loading-status.model";
import { Box } from "../../box/box.component";
import { Button } from "../../button/button.component";
import { CircularProgress } from "../../circular-progress/circular-progress.component";
import { ComponentCommonProps } from "../../component/component-common-props.model";
import { Typography } from "../../typography/typography.component";
import { useInfiniteListComponent } from "./infinite-list-component.hook";

type Props<T> = {
  canLoadMore: boolean;
  items: T[];
  loadingStatus: AsyncDataLoadingStatus;
  onLoadMore: VoidFunction;
  renderItem: (item: T) => React.ReactNode;
} & ComponentCommonProps;

export function InfiniteList<T>({
  canLoadMore,
  className,
  items,
  loadingStatus,
  onLoadMore,
  renderItem,
  testId
}: Props<T>) {
  const { error, isContentVisible, isLoaderVisible, loadMoreButton, loadingMore, noData, noMoreData } =
    useInfiniteListComponent({
      canLoadMore,
      items,
      loadMore: onLoadMore,
      loadingStatus
    });

  return (
    <Box className={className} data-testid={testId} width={"100%"}>
      {isContentVisible && (
        <>
          {items.map((item, index) => (
            <Fragment key={index}>{renderItem(item)}</Fragment>
          ))}
        </>
      )}
      {isLoaderVisible && (
        <LoaderWrapper width={"100%"}>
          <CircularProgress testId="infinite-list-circular-progress" />
        </LoaderWrapper>
      )}
      {loadMoreButton.isVisible && (
        <LoadMoreButton onClick={loadMoreButton.onClick} testId="infinite-list-load-more-button">
          {loadMoreButton.label}
        </LoadMoreButton>
      )}
      {error.isVisible && (
        <Typography testId="infinite-list-error-message" textAlign={"center"} variant="subtitle">
          {error.label}
        </Typography>
      )}
      {loadingMore.isVisible && (
        <Typography testId="infinite-list-loading-more-message" textAlign={"center"} variant="subtitle">
          {loadingMore.label}
        </Typography>
      )}
      {noMoreData.isVisible && (
        <Typography testId="infinite-list-no-more-data-message" textAlign={"center"} variant="subtitle">
          {noMoreData.label}
        </Typography>
      )}
      {noData.isVisible && (
        <Typography testId="infinite-list-no-data-message" textAlign={"center"} variant="subtitle">
          {noData.label}
        </Typography>
      )}
    </Box>
  );
}

const LoaderWrapper = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "center"
  };
});

const LoadMoreButton = styled(Button)(() => {
  return {
    width: "100%"
  };
});
