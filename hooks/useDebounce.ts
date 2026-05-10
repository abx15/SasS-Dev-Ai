"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Debounces a value by the given delay (ms).
 * Useful for search inputs to avoid firing API calls on every keystroke.
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400);
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounced callback version — debounces a function call.
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay = 400
): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return ((...args: Parameters<T>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (callbackRef.current as (...a: unknown[]) => void)(...(args as unknown[]));
    }, delay);
  }) as T;
}
