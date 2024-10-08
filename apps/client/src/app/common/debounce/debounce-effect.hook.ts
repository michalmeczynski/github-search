import { useEffect } from "react";

export const useDebouncedEffect = (callback: VoidFunction, dependencies: unknown[], delay: number): void => {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, delay]);
};
