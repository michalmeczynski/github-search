import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { AsyncDataLoadingStatus } from "../../async/async-data-loading-status.model";
import { InfiniteList } from "./infinite-list.component";

describe("InfiniteList", () => {
  const renderItem = jest.fn((item) => <div>{item}</div>);
  const defaultProps = {
    canLoadMore: false,
    items: ["Item 1", "Item 2"],
    loadingStatus: AsyncDataLoadingStatus.success,
    onLoadMore: jest.fn(),
    renderItem
  };

  it("should render items when items is not empty", () => {
    render(<InfiniteList {...defaultProps} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(renderItem).toHaveBeenCalledTimes(2);
  });

  it("should display loader when loading", () => {
    render(<InfiniteList {...defaultProps} loadingStatus={AsyncDataLoadingStatus.loading} />);

    expect(screen.getByTestId("infinite-list-circular-progress")).toBeInTheDocument();
  });

  it("should display load more button when can load more", () => {
    render(<InfiniteList {...defaultProps} canLoadMore={true} />);

    const loadMoreButton = screen.getByTestId("infinite-list-load-more-button");
    expect(loadMoreButton).toBeInTheDocument();
  });

  it("should call onLoadMore when load more button is clicked", () => {
    const onLoadMoreMock = jest.fn();
    render(<InfiniteList {...defaultProps} canLoadMore={true} onLoadMore={onLoadMoreMock} />);

    const loadMoreButton = screen.getByTestId("infinite-list-load-more-button");
    fireEvent.click(loadMoreButton);

    expect(onLoadMoreMock).toHaveBeenCalledTimes(1);
  });

  it("should display error message when is error", () => {
    render(<InfiniteList {...defaultProps} loadingStatus={AsyncDataLoadingStatus.error} />);

    expect(screen.getByTestId("infinite-list-error-message")).toBeInTheDocument();
  });

  it("should display loading more message when loading more", () => {
    render(<InfiniteList {...defaultProps} canLoadMore={true} loadingStatus={AsyncDataLoadingStatus.loadingMore} />);

    expect(screen.getByTestId("infinite-list-loading-more-message")).toBeInTheDocument();
  });

  it("should display no more data message when all data is loaded", () => {
    render(<InfiniteList {...defaultProps} canLoadMore={false} loadingStatus={AsyncDataLoadingStatus.success} />);

    expect(screen.getByTestId("infinite-list-no-more-data-message")).toBeInTheDocument();
  });

  it("should display no data message when there is no data", () => {
    render(<InfiniteList {...defaultProps} items={[]} loadingStatus={AsyncDataLoadingStatus.success} />);

    expect(screen.getByTestId("infinite-list-no-data-message")).toBeInTheDocument();
  });
});
