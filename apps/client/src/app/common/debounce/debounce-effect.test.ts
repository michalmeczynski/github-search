import { renderHook } from "@testing-library/react";

import { useDebouncedEffect } from "./debounce-effect.hook";

describe("useDebouncedEffect", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call the callback after the delay", () => {
    const callback = jest.fn();
    const delay = 500;
    renderHook(() => useDebouncedEffect(callback, [], delay));
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should reset the timer if dependencies change", () => {
    const callback = jest.fn();
    const delay = 500;
    let dep = "someDep";

    const { rerender } = renderHook(() => useDebouncedEffect(callback, [dep], delay));

    jest.advanceTimersByTime(delay / 2);

    dep = "differentDep";

    rerender();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clean up the timer on unmount", () => {
    const callback = jest.fn();
    const delay = 500;

    const { unmount } = renderHook(() => useDebouncedEffect(callback, [], delay));

    unmount();

    jest.advanceTimersByTime(delay);

    expect(callback).not.toHaveBeenCalled();
  });
});
